// Server Config
import dns from "dns";
// Use public DNS servers for MongoDB SRV resolution if local resolver fails.
dns.setServers(["8.8.8.8", "1.1.1.1", "9.9.9.9"]);


import { URL } from "url";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter"; // ✅ CORRECT PATH


const uri = process.env.MONGO_URI;
if (!uri) throw new Error("Missing MONGO_URI environment variable");

let clientUri = uri;
if (uri.startsWith("mongodb+srv://")) {
  const parsed = new URL(uri);
  const srvHost = parsed.hostname;
  const srvRecords = await dns.promises.resolveSrv(`_mongodb._tcp.${srvHost}`);
  const hosts = srvRecords.map((record) => `${record.name}:${record.port}`).join(",");

  if (!parsed.searchParams.has("tls") && !parsed.searchParams.has("ssl")) {
    parsed.searchParams.set("tls", "true");
  }

  const auth = parsed.username || parsed.password
    ? `${encodeURIComponent(parsed.username)}:${encodeURIComponent(parsed.password)}@`
    : "";
  const dbName  = parsed.pathname?.slice(1) || "";
  const query = parsed.searchParams.toString();
  clientUri = `mongodb://${auth}${hosts}/${dbName}${query ? `?${query}` : ""}`;
}

const client = new MongoClient(clientUri);
const db = client.db("suncart"); // Changed database name

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
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
  baseURL: process.env.BETTER_AUTH_URL,
});