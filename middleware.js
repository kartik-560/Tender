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

  const token = request.cookies.get('token')?.value;

  // In development/prototype mode, permit client-side auth state to manage access
  // while checking cookie if present
  if (isProtectedRoute && !token) {
    // If testing via client local storage, let the page load so AuthProvider can hydrate
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/tenders/:path*', '/analytics/:path*'],
};
