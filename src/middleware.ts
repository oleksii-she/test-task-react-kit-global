import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/profile'];
const publicOnlyRoutes = ['/auth', '/auth/signin', '/auth/register'];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/signin';
    return NextResponse.redirect(url);
  }

  if (publicOnlyRoutes.some((route) => pathname.startsWith(route)) && token) {
    const url = req.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/auth/:path*'],
};
