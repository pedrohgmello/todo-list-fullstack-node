import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const CreateUserSchema = z.object({
    user_email: z.email(),
    user_password: z.string()
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {};
