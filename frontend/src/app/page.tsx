import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cookies } from 'next/headers'
import { CheckCircle2, LayoutIcon, ShieldCheck } from "lucide-react";

export default async function HomePage() {


  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('access_token');
  
  return (
    <div className="flex flex-col items-center">
      {/* HERO SECTION */}
      <section className="w-full py-20 lg:py-32 bg-zinc-200 border-b">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-4">
          <Badge variant="secondary" className="px-4 py-1 mb-4">
            🚀 Versão 1.0 lançada
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Domine sua rotina com <br className="hidden sm:inline" />
            <span className="text-primary">TodoApp.</span>
          </h1>
          <p className="mx-auto max-w-175 text-muted-foreground md:text-xl">
            A ferramenta minimalista e poderosa para organizar suas tarefas do dia a dia. 
            Focada em performance e produtividade.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
            <Button asChild size="lg" className="px-8">
              {isLoggedIn ? (
                <Link href="/tasks">Minhas Tarefas</Link>
              )
                : (
                <Link href="/register">Começar Agora</Link>
              )}
              
            </Button>
            {!isLoggedIn && (
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link href="/login">Fazer Login</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container py-20 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <LayoutIcon className="text-primary w-6 h-6" />
              </div>
              <CardTitle>Interface Clean</CardTitle>
              <CardDescription>
                Design focado no que importa, sem distrações para sua produtividade.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ShieldCheck className="text-primary w-6 h-6" />
              </div>
              <CardTitle>Seguro</CardTitle>
              <CardDescription>
                Autenticação JWT com Cookies httpOnly para manter seus dados protegidos.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="text-primary w-6 h-6" />
              </div>
              <CardTitle>Fácil Gerenciamento</CardTitle>
              <CardDescription>
                Crie, conclua e delete tarefas com apenas um clique de forma instantânea.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 TodoApp. Desenvolvido por Pedro Mello.
          </p>
        </div>
      </footer>
    </div>
  );
}