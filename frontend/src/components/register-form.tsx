'use client'

import { createUser } from "@/actions/auth-actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { CardFooter } from "./ui/card";
import { Alert, AlertTitle } from "./ui/alert";
import { BadgeAlert } from "lucide-react";
import Link from "next/link";


export default function RegisterForm(){

    const [state, formAction, isPending]  = useActionState(createUser, { error: null });

    return (
        <form action={formAction}>
            <div className="flex flex-col gap-6">

                { state?.error && (
                    <Alert className="bg-black text-zinc-200">
                      <BadgeAlert />
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
              <Link href="/login" className="underline font-medium">
                Já tem conta? Entre
              </Link>
            </CardFooter>
          </form>
    )
}