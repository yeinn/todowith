import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { customAlphabet } from 'nanoid';

@Injectable()
export class UsersService {
  private generateUserCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 9);

  constructor(private supabaseService: SupabaseService) {}

  async createUser() {
    const userCode = this.generateUserCode();
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .insert([{ user_code: userCode }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserByCode(userCode: string) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('*')
      .eq('user_code', userCode)
      .single();

    if (error) throw error;
    return data;
  }
} 