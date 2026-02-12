import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function hasAuthSessionCookie(request: NextRequest): boolean {
  const secureToken = request.cookies.get("__Secure-next-auth.session-token")?.value
  const regularToken = request.cookies.get("next-auth.session-token")?.value
  return Boolean(secureToken || regularToken)
}

export function proxy(request: NextRequest) {
  if (hasAuthSessionCookie(request)) {
    return NextResponse.next()
  }

  const signInUrl = new URL("/auth/signin", request.url)
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname)
  return NextResponse.redirect(signInUrl)
}

export const config = {
  matcher: ["/dashboard/:path*", "/ai-analysis/:path*"],
}
