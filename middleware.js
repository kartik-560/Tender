import { NextResponse } from 'next/server';

/**
 * Next.js Edge Middleware for route protection
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protected route paths
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/tenders') ||
    pathname.startsWith('/analytics');

  // Auth page paths (login/register)
  const isAuthRoute =
    pathname.startsWith('/login') ||
    pathname.startsWith('/register');

  const token = request.cookies.get('token')?.value;

  // Redirect unauthenticated users away from protected routes
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages to dashboard
  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/tenders/:path*', '/analytics/:path*', '/login', '/register'],
};
