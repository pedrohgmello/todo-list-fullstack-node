import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createTaskDto: CreateTaskDto, @GetUser('sub') user_id: string) {
    return this.taskService.create(createTaskDto, user_id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetUser('sub') user_id: string) {
    return this.taskService.findAll(user_id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string, @GetUser('sub') user_id: string) {
    return this.taskService.findOne(id, user_id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto, @GetUser('sub') user_id: string) {
    return this.taskService.update(id, updateTaskDto, user_id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @GetUser('sub') user_id: string) {
    return this.taskService.remove(id, user_id);
  }
}
