'use server'

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";
import api from "@/lib/api";
import { LoginRequest } from "@/types/auth";


export async function logoutAction(){
    const cookieStore = await cookies();

    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    redirect('/login');
}

type ActionState = {
  error: string | null;
};

export async function loginUser(actionState: ActionState, formData: FormData): Promise<ActionState> {
        'use server'
        const request: LoginRequest = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        };
    
        try {
          const response = await api("/auth/login", {
            method: "POST",
            body: JSON.stringify(request),
          });

          const cookieStore = await cookies();
          cookieStore.set("access_token", response.access_token, {
            httpOnly: true, // Impede que scripts maliciosos (JS) leiam o token
            secure: process.env.NODE_ENV === "production", // Só envia via HTTPS em produção
            sameSite: "lax", // Proteção básica contra CSRF
            path: "/", // O cookie vale para o site inteiro (/tasks, /profile, etc)
            maxAge: 15 * 60, // Tempo de vida (ex: 1 dia em segundos)
          });

        } catch (error: unknown) {
          if (error && typeof error === 'object' && 'status' in error) {
            const status = (error as { status: number }).status;
            if(status === 401){
                return { error: 'E-mail ou senha incorretos.' };
            }
            return { error: 'Erro desconhecido no servidor' };
          }  
        }
    
        revalidatePath("/login");
        redirect('/tasks');
}