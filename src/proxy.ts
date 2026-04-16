import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile"];

export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const session = request.cookies.get("better-auth.session_token")?.value;

  const isAuthenticated = !!session;

  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route),
  );

  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname + search);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/:path*"],
};
