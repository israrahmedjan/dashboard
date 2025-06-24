// middleware.js
import { NextResponse } from 'next/server';

// ✅ Simulated check (replace this with real logic like cookies or headers)
export function isLoggedIn(req) {
  // Example: Check for cookie named "token"
  const token = req.cookies.get('token');
  return !!token;
}

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Skip middleware for login page and public files
  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api')
  ) {
    return NextResponse.next();
  }

  // ✅ Protect the /dashboard route
  if (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/products')
  ) {
    if (!isLoggedIn(req)) {
      // If not logged in, redirect to /login
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }


  // Default: allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/products/:path*',     // ✅ Protect /products and nested routes
    '/products',            // ✅ Protect base /products route too
  ],
};

