import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto, UpdateTodoDto } from './interfaces/todo.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(@Query('userCode') userCode: string) {
    return this.todosService.findAllByUserCode(userCode);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    // user_id는 클라이언트에서 user_code를 받아 직접 변환해서 넘겨주거나
    // 서버에서 userCode를 받아 user_id로 변환해야 합니다.
    // 현재는 CreateTodoDto에 user_id가 직접 들어온다고 가정합니다.
    return this.todosService.create(createTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
} 