import { redirect } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest){
    const token = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;

    if(pathname.startsWith('/tasks') && !token){
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const conig = {
    matcher: ['/tasks/:path*']
}