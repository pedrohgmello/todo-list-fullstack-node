import { TaskResponse } from "@/types/tasks";
import { TaskItem } from "./task-item";

export function TaskList({ tasks }: { tasks: TaskResponse[] }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 border-2 border-dashed rounded-xl border-zinc-100 text-zinc-400">
        Nenhuma tarefa encontrada. Que tal criar uma?
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.task_id} task={task} />
      ))}
    </div>
  );
}