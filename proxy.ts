import { clerkMiddleware } from '@clerk/nextjs/server'

// Next.js 16 renamed the `middleware.ts` convention to `proxy.ts` (the
// exported function is also renamed from `middleware` to `proxy`).
// See: https://nextjs.org/docs/messages/middleware-to-proxy
//
// Clerk's `createRouteMatcher()` is now deprecated too - Clerk's own
// guidance is to stop doing route-matching/auth checks here and instead
// protect each resource where it's actually read/written (Server
// Component, Route Handler, or the FastAPI backend itself). See:
// https://clerk.com/docs/reference/nextjs/clerk-middleware
//
// So this file stays intentionally "thin": it just makes auth() available
// throughout the app (refreshes the session, sets headers) and does no
// route matching or redirect logic itself.
export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
