import api from "@/lib/api";
import { TaskResponse } from "@/types/tasks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { TaskList } from "@/components/task-list";

export const dynamic = 'force-dynamic';

export default async function TasksPage() {
  const tasks = await api<TaskResponse[]>("/task", {
    method: "GET",
  });

  return (
    <div className="container max-w-2xl py-8 space-y-6">
      {/* HEADER DA PÁGINA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Minhas Tarefas</h1>
          <p className="text-muted-foreground text-sm">
            Gerencie seus afazeres diários.
          </p>
        </div>

        {/* BOTÃO QUE LEVA PARA A NOVA ROTA */}
        <Button asChild>
          <Link href="/tasks/new" className="gap-2">
            <Plus className="h-4 w-4" /> Nova Tarefa
          </Link>
        </Button>
      </div>
      <TaskList tasks={tasks} />
    </div>
  );
}
