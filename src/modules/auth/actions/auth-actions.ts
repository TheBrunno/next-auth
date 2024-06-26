import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import AuthServices from "../services/auth-service";

const prisma = new PrismaClient();

async function createAccount(formData: FormData) {
    'use server';

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    });
    console.log('Cadastrado com sucesso!');

    await AuthServices.createSessionToken({ sub: user.id, name: user.name, email: user.email });

    redirect('/portal');
}

async function login(formData: FormData) {
    'use server';

    console.log(formData)

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) {
        console.log('usuario nao encontrado'); // posso usar optimistic -> atualizar a tela
        redirect('/portal/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Usuário ou senha inválidos'); // posso usar optimistic -> atualizar a tela
      redirect('/portal/login');
    }

    await AuthServices.createSessionToken({ sub: user.id, name: user.name, email: user.email });

    redirect('/portal');
}

const AuthActions = {
    createAccount,
    login
}

export default AuthActions;