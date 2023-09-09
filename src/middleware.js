import { NextResponse } from 'next/server'
import { verifyToken } from './helpers/verifyToken';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request, response, next) {
    
    if (request.nextUrl.pathname.startsWith('/api/verify')) {
        const token = request.nextUrl.searchParams.get('token');
        const tokenVerify = await verifyToken(token);

        const requestHeaders = new Headers(request.headers);

        const userName = tokenVerify['name']
        const userEmail = tokenVerify['email']
        requestHeaders.set('userName',userName);
        requestHeaders.set('userEmail',userEmail);

        return NextResponse.next({
            request: {headers:requestHeaders}
        });
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/verify',
}
