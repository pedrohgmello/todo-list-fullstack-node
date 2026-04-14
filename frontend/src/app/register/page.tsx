import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import { CreateUserRequest } from "@/types/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function RegisterPage() {
  async function createUser(formData: FormData) {
    'use server'
    const request: CreateUserRequest = {
      user_email: formData.get('userEmail') as string,
      user_password: formData.get('userPassword') as string,
    };

    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(request),
      });
    } catch (error) {
      console.error("Erro ao tentar consumir api: ", error);
    }

    revalidatePath("/register");
    redirect('/login');
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Registre-se</CardTitle>
          <CardDescription>
            Digite seu email e senha para se registrar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createUser}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  name="userEmail"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  name="userPassword"
                  placeholder="suaSenha123"
                  required
                />
              </div>
            </div>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Registrar
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
