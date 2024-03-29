import * as React from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import AuthActions from "../actions/auth-actions"

export default function LoginForm() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Next auth</CardTitle>
                <CardDescription>Faça login para continuar</CardDescription>
            </CardHeader>
            <form action={AuthActions.login}>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" name="email" required />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" name="password" required type="password" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button>Entrar</Button>
                    <Link href='/portal/cadastro' className={buttonVariants({ variant: 'link' })}>Criar conta</Link>
                </CardFooter>
            </form>
        </Card>

    )
}