import { nanoid } from 'nanoid';
import { Task } from 'src/task/entities/task.entity';
import { Entity, PrimaryColumn, Column, BeforeInsert, OneToMany } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryColumn({ type: 'varchar', length: 21 })
    user_id!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    user_email!: string;

    @Column({ type: 'varchar', length: 255 })
    user_password!: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks!: Task[]

    @BeforeInsert()
    generateId(){
        this.user_id = nanoid();
    }
}
