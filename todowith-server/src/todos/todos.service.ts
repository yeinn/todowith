import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersService } from '../users/users.service';
import { Todo, CreateTodoDto, UpdateTodoDto } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  constructor(
    private supabaseService: SupabaseService,
    private usersService: UsersService,
  ) {}

  async findAllByUserCode(userCode: string): Promise<Todo[]> {
    const user = await this.usersService.getUserByCode(userCode);
    if (!user) {
      return [];
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from('todos')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const user = await this.usersService.getUserByCode(createTodoDto.userCode);
    if (!user) {
      throw new Error('User not found with provided userCode.');
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from('todos')
      .insert([{ user_id: user.id, text: createTodoDto.text }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('todos')
      .update(updateTodoDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabaseService
      .getClient()
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
} 