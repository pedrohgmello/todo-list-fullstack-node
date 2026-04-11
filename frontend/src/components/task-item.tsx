"use client";

import { useState } from "react";
import { CheckCircle2, Circle, Trash2, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { deleteTaskAction, toggleTaskAction } from "@/actions/task-actions";
import { TaskResponse } from "@/types/tasks";

export function TaskItem({ task }: { task: TaskResponse }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="overflow-hidden border-zinc-200 shadow-sm transition-all hover:border-zinc-300">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Action de Toggle */}
            <form action={toggleTaskAction.bind(null, task.task_id)}>
              <button type="submit" className="hover:scale-110 transition-transform active:scale-95">
                {task.completed ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-zinc-300" />
                )}
              </button>
            </form>
            
            <div 
              className="cursor-pointer select-none" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className={`text-sm sm:text-base ${task.completed ? "line-through text-zinc-400 font-normal" : "font-medium text-zinc-800"}`}>
                {task.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {task.completed && <Badge variant="secondary" className="bg-zinc-100 text-zinc-600 border-none px-2 py-0">OK</Badge>}
            
            <Button variant="ghost" size="icon" asChild className="h-8 w-8">
              <Link href={`/tasks/${task.task_id}/edit`}>
                <Pencil className="h-4 w-4 text-zinc-500" />
              </Link>
            </Button>

            <form action={deleteTaskAction.bind(null, task.task_id)}>
              <Button variant="ghost" size="icon" type="submit" className="h-8 w-8 text-zinc-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </Button>
            </form>

            {task.description && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronUp className="h-4 w-4 text-zinc-400" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
              </Button>
            )}
          </div>
        </div>

        {isExpanded && task.description && (
          <div className="pl-9 pr-4 pb-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <p className="text-sm text-zinc-500 border-t border-zinc-100 pt-2 leading-relaxed italic">
              {task.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}