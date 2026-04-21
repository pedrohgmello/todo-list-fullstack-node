import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { loginUser } from '@/actions/auth-actions';
import { Alert, AlertTitle } from '@/components/ui/alert'

export default function LoginForm(){

  const [state, formAction, isPending] = useActionState(loginUser, { error: null });
    return (
        <>
         <form action={formAction}>
            <div className="flex flex-col gap-6">

              {state?.error && (
                <Alert>
                  <AlertTitle>
                    {state.error}
                  </AlertTitle>
                </Alert>
              )}

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
        </>  
    )
}