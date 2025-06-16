import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [TodosController],
  providers: [TodosService, SupabaseService],
})
export class TodosModule {} 