import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [UsersService, SupabaseService],
  exports: [UsersService], // UsersService를 다른 모듈에서 사용할 수 있도록 export합니다.
})
export class UsersModule {} 