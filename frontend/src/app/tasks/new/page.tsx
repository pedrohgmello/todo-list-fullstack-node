import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Se tiver instalado
import { createTaskAction } from "@/actions/task-actions";
import Link from "next/link";

export default function NewTaskPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Nova Tarefa</CardTitle>
          <CardDescription>
            Descreva o que precisa ser feito hoje.
          </CardDescription>
        </CardHeader>
        
        <form action={createTaskAction}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título da tarefa</Label>
              <Input 
                id="title" 
                name="title" 
                placeholder="Ex: Estudar NestJS" 
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição (opcional)</Label>
              <Textarea 
                id="description" 
                name="description" 
                placeholder="Detalhes sobre a tarefa..." 
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                Criar Tarefa
              </Button>
              <Button variant="outline" asChild>
                <Link href="/tasks">Cancelar</Link>
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}