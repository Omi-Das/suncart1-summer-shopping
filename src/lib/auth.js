// Server Config
import dns from "dns";
// Use public DNS servers for MongoDB SRV resolution if local resolver fails.
dns.setServers(["8.8.8.8", "1.1.1.1", "9.9.9.9"]);

import { URL } from "url";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter"; // ✅ CORRECT PATH

const globalForMongo = globalThis;

function isEmbeddedMongo() {
  const v = process.env.MONGO_URI_EMBEDDED;
  const flagged = v === "1" || v?.toLowerCase() === "true";
  return flagged && process.env.NODE_ENV === "development";
}

function dbNameFromConnectionString(connectionString) {
  if (!connectionString) return null;
  const noQuery = connectionString.split("?")[0];
  const match = noQuery.match(/mongodb(?:\+srv)?:\/\/[^/]+\/([^/?]+)$/);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

async function resolveMongoResources() {
  if (globalForMongo.__betterAuthMongoResources) {
    return globalForMongo.__betterAuthMongoResources;
  }

  let clientUri;
  let dbName;

  if (isEmbeddedMongo()) {
    const devDb = process.env.MONGODB_DATABASE || "suncart";
    if (!globalForMongo.__betterAuthMongoMemoryReplSet) {
      const { MongoMemoryReplSet } = await import("mongodb-memory-server");
      globalForMongo.__betterAuthMongoMemoryReplSet =
        await MongoMemoryReplSet.create({
          replSet: {
            count: 1,
            storageEngine: "wiredTiger",
          },
        });
      if (
        process.env.NODE_ENV === "development" &&
        !globalForMongo.__betterAuthEmbeddedMongoLogged
      ) {
        globalForMongo.__betterAuthEmbeddedMongoLogged = true;
        console.info(
          "[better-auth] Embedded MongoDB replica set (set MONGO_URI_EMBEDDED=0 and fix MONGO_URI to use Atlas)"
        );
      }
    }
    const replSet = globalForMongo.__betterAuthMongoMemoryReplSet;
    clientUri = replSet.getUri(devDb);
    dbName = devDb;
  } else {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("Missing MONGO_URI environment variable");

    clientUri = uri;
    if (uri.startsWith("mongodb+srv://")) {
      const parsed = new URL(uri);
      const srvHost = parsed.hostname;
      const srvRecords = await dns.promises.resolveSrv(
        `_mongodb._tcp.${srvHost}`
      );
      const hosts = srvRecords
        .map((record) => `${record.name}:${record.port}`)
        .join(",");

      if (!parsed.searchParams.has("tls") && !parsed.searchParams.has("ssl")) {
        parsed.searchParams.set("tls", "true");
      }

      const auth =
        parsed.username || parsed.password
          ? `${encodeURIComponent(parsed.username)}:${encodeURIComponent(parsed.password)}@`
          : "";
      const dbNameFromPath = parsed.pathname?.slice(1) || "";
      const query = parsed.searchParams.toString();
      clientUri = `mongodb://${auth}${hosts}/${dbNameFromPath}${query ? `?${query}` : ""}`;
    }

    dbName =
      process.env.MONGODB_DATABASE ||
      dbNameFromConnectionString(clientUri) ||
      "suncart";
  }

  const client = new MongoClient(clientUri);
  const db = client.db(dbName);
  globalForMongo.__betterAuthMongoResources = { client, db };
  return globalForMongo.__betterAuthMongoResources;
}

const { client, db } = await resolveMongoResources();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // redirectURI: "http://localhost:3000/api/auth/callback/google",
    },
    // github: {
    //       clientId: process.env.GITHUB_CLIENT_ID,
    //       clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //   },
  },
  baseURL: process.env.BETTER_AUTH_URL?.replace(/\/+$/, ""),
});
