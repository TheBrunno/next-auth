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

const onlyGuessRoutes = [
    '/portal/cadastro',
    '/portal/login'
]

export async function middleware(req: NextRequest){
    const pathname = req.nextUrl.pathname;

    const session = await AuthServices.isSessionValid();
    if(onlyGuessRoutes.includes(pathname) && session){
        return NextResponse.redirect(new URL('/portal', req.url))
    }
    if(publicRoutes.includes(pathname)){
        return NextResponse.next();
    }
    if(!session){
        const isAPIRoute = pathname.startsWith('/api');
        if(isAPIRoute){
            return NextResponse.json({message: 'Não autorizado'}, {status: 401})
        }
        return NextResponse.redirect(new URL('/portal/login', req.url))
    }

    NextResponse.next();
}