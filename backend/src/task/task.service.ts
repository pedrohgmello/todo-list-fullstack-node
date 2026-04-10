import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>
  ) {}
  async create(createTaskDto: CreateTaskDto, user_id: string) {
    if(!createTaskDto.title) throw new BadRequestException();
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user: { user_id: user_id}
    });
    return await this.taskRepository.save(newTask);

  }

  findAll(user_id: string) {
    return this.taskRepository.find({ where: { user: { user_id: user_id } } })
  }

  findOne(id: string, user_id: string) {
    return this.taskRepository.findOne({ where: { task_id: id, user: { user_id: user_id } } });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user_id: string) {
    const task = await this.taskRepository.findOne({ where: { task_id: id, user: { user_id: user_id } } });
    if(!task) throw new NotFoundException();
    return await this.taskRepository.update(id, {
      ...updateTaskDto
    })
  }

  async complete(id: string, user_id: string) {
    const task = await this.taskRepository.findOne({ where: { task_id: id, user: { user_id } } });

    if(!task) throw new NotFoundException();

    if(task.completed) return await this.taskRepository.update(id, { completed: false });
    return await this.taskRepository.update(id, { completed: true })
  }

  async remove(id: string, user_id: string) {
    const task = await this.taskRepository.findOne({ where: { task_id: id, user: { user_id: user_id } } });
    if(!task) throw new NotFoundException();
    return await this.taskRepository.delete(id);
  }
}
