import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { customAlphabet } from 'nanoid';

@Injectable()
export class UsersService {
  // user_ 접두사와 함께 6자리 알파벳+숫자 조합으로 user_code 생성
  private generateUserCode = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);

  constructor(private supabaseService: SupabaseService) {}

  async createUser() {
    let userCode: string = '';
    let isDuplicate = true;
    let attempts = 0;
    const maxAttempts = 10; // 최대 10번까지 시도

    // 중복되지 않는 user_code를 생성할 때까지 반복
    while (isDuplicate && attempts < maxAttempts) {
      userCode = `user_${this.generateUserCode()}`;
      
      // 이미 존재하는 user_code인지 확인
      const { data: existingUser, error } = await this.supabaseService
        .getClient()
        .from('users')
        .select('user_code')
        .eq('user_code', userCode)
        .single();

      if (error && error.code === 'PGRST116') {
        // PGRST116은 "결과가 없음" 에러 코드입니다. 즉, 중복되지 않음
        isDuplicate = false;
      } else if (error) {
        // 다른 에러가 발생한 경우
        throw error;
      } else {
        // 사용자가 존재하는 경우 (중복)
        attempts++;
        continue;
      }
    }

    if (attempts >= maxAttempts) {
      throw new Error('Failed to generate unique user_code after maximum attempts');
    }

    // 중복되지 않는 user_code로 새 사용자 생성
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
      .eq('user_code', userCode);

    if (error) {
      console.error('Error fetching user by code:', error);
      throw error;
    }

    // 사용자가 없으면 null 반환
    if (!data || data.length === 0) {
      return null;
    }

    return data[0];
  }
} 