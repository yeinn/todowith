import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    // Supabase URL 및 Key가 정의되지 않았다면 오류를 발생시킵니다.
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase URL and Key are required. Please check your .env.local file.');
    }

    this.supabase = createClient(
      supabaseUrl,
      supabaseKey,
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
} 