import AuthServices from "@/modules/auth/services/auth-service";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest){
    AuthServices.destroySession();

    return NextResponse.redirect(new URL('/portal/login', req.url))
}