export interface TaskResponse {
    task_id: string,
    title: string
    description?: string
    completed: boolean
}

export interface CreateTaskRequest{
    title: string,
    description: string
}
