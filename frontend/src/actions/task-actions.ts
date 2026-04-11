'use server';

import api from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Ação para deletar uma tarefa
 * Chamada via: deleteTaskAction.bind(null, task.id)
 */
export async function deleteTaskAction(id: string) {
  try {
    // Concatenação simples para evitar problemas com template literals se preferir
    await api("/task/" + id, {
      method: "DELETE",
    });

    // Avisa ao Next.js que os dados da página de tarefas mudaram
    revalidatePath("/tasks");
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
  }
}


export async function toggleTaskAction(id: string) {
  console.log(">>> DISPAROU A ACTION PARA O ID:", id);
  try {
    const response = await api(`/task/${id}/complete`, {
      method: "PATCH",
    });
    console.log(">>> RESPOSTA DO NESTJS:", response);

    revalidatePath('/tasks');
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
  }
}


export async function createTaskAction(formData: FormData){
    try {
        await api('/task', {
            method: 'POST',
            body: JSON.stringify({
                title: formData.get('title'),
                description: formData.get('description')
            })
        })
        revalidatePath('/tasks')
    } catch(error) {
        console.error('Erro ao criar tarefa: ', error);
    }

    redirect('/tasks');

}

export async function editTaskAction(id: string, formData: FormData){
  try{
    await api(`/task/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description')
      })
    })
    revalidatePath('/tasks')
  } catch(error){
    console.error('Erro ao atualizar tarefa: ', error)
  }

  redirect('/tasks');
}