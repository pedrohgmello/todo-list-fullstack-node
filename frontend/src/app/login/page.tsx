import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { LoginRequest } from "@/types/auth";
import { revalidatePath } from "next/cache";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

export default function LoginPage(){
    async function loginUser(formData: FormData) {
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

        } catch (error) {
          console.error("Erro ao tentar consumir api: ", error);
        }
    
        revalidatePath("/login");
        redirect('/tasks');
    }

    return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Digite seu email e senha para fazer login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginUser}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="suaSenha123"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>    
    </>
  );
    
}