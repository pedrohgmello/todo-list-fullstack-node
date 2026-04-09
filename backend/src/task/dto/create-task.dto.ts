import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
})

export class CreateTaskDto extends createZodDto(CreateTaskSchema) {};