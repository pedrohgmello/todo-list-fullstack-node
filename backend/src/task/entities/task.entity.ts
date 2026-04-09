import { nanoid } from "nanoid";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('task')
export class Task {
    @PrimaryColumn({ type: 'varchar', length: 21 })
    task_id!: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title!: string;

    @Column({  type: 'text', nullable: true })
    description!: string;

    @Column({ type: 'boolean', nullable: false})
    completed!: boolean;

    @ManyToOne(() => User, (user) => user)
    @JoinColumn({ name: 'user_id' })
    user!: User

    @BeforeInsert()
    generateId(){
        this.task_id = nanoid();
    }

    @BeforeInsert()
    insertCompleted(){
        this.completed = false;
    }
}
