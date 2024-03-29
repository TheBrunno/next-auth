import { NextRequest, NextResponse } from "next/server"
import AuthServices from "./modules/auth/services/auth-service";

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
  };

const publicRoutes = [
    '/',
    '/portal/cadastro',
    '/portal/login'
];

export async function middleware(req: NextRequest){
    const pathname = req.nextUrl.pathname;

    if(publicRoutes.includes(pathname)){
        return NextResponse.next();
    }
    const session = await AuthServices.isSessionValid();

    if(!session){
        return NextResponse.redirect(new URL('/portal/login', req.url))
    }
}