// Server Config
import dns from "dns";
// Use public DNS servers for MongoDB SRV resolution if local resolver fails.
dns.setServers(["8.8.8.8", "1.1.1.1", "9.9.9.9"]);


import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/products/", "/profile"];

function hasSessionCookie(request) {
  const possibleCookieNames = [
    "better-auth.session_token",
    "__Secure-better-auth.session_token",
    "better-auth.session",
    "__Secure-better-auth.session",
  ];

  return possibleCookieNames.some((name) => Boolean(request.cookies.get(name)?.value));
}

export default function proxy(request) {
  const { pathname, search } = request.nextUrl;
  const isProtectedPath = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!isProtectedPath) {
    return NextResponse.next();
  }

  if (hasSessionCookie(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", `${pathname}${search || ""}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/products/:path*", "/profile/:path*"],
};
