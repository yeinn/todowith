import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersService } from '../users/users.service';
import { Verification, CreateVerificationDto } from './interfaces/verification.interface';

@Injectable()
export class VerificationsService {
  constructor(
    private supabaseService: SupabaseService,
    private usersService: UsersService,
  ) {}

  async uploadImage(file: Express.Multer.File, userCode: string): Promise<Verification> {
    const user = await this.usersService.getUserByCode(userCode);
    if (!user) {
      throw new Error('User not found with provided userCode.');
    }

    // 파일 검증
    if (!file) {
      throw new Error('No file uploaded.');
    }

    if (!file.mimetype.startsWith('image/')) {
      throw new Error('Only image files are allowed.');
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB 제한
      throw new Error('File size too large. Maximum 5MB allowed.');
    }

    try {
      // 안전한 파일명 생성 (한글, 공백, 특수문자 제거)
      const timestamp = Date.now();
      const fileExtension = file.originalname.split('.').pop() || 'jpg';
      const safeFileName = `${userCode}_${timestamp}.${fileExtension}`;

      // Supabase Storage에 파일 업로드
      const { data: uploadData, error: uploadError } = await this.supabaseService
        .getClient()
        .storage
        .from('verifications')
        .upload(safeFileName, file.buffer, {
          contentType: file.mimetype,
          cacheControl: '3600',
        });

      if (uploadError) {
        throw new Error(`Failed to upload file: ${uploadError.message}`);
      }

      // 업로드된 파일의 공개 URL 가져오기
      const { data: urlData } = this.supabaseService
        .getClient()
        .storage
        .from('verifications')
        .getPublicUrl(safeFileName);

      // 서버 시간을 기준으로 타임스탬프 생성
      const verifiedAt = new Date();

      // 데이터베이스에 인증 기록 저장
      const { data, error } = await this.supabaseService
        .getClient()
        .from('verifications')
        .insert([{ 
          user_id: user.id, 
          image_url: urlData.publicUrl,
          verified_at: verifiedAt.toISOString()
        }])
        .select();

      if (error) {
        console.error('Database insert error:', error);
        throw new Error(`Failed to save verification record: ${error.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error('Failed to save verification record: No data returned');
      }

      return data[0];

    } catch (error) {
      console.error('Upload error:', error);
      throw new Error(`Verification upload failed: ${error.message}`);
    }
  }

  async create(createVerificationDto: CreateVerificationDto): Promise<Verification> {
    const user = await this.usersService.getUserByCode(createVerificationDto.userCode);
    if (!user) {
      throw new Error('User not found with provided userCode.');
    }

    // 서버 시간을 기준으로 타임스탬프 생성
    const verifiedAt = new Date();

    const { data, error } = await this.supabaseService
      .getClient()
      .from('verifications')
      .insert([{ 
        user_id: user.id, 
        image_url: createVerificationDto.image_url,
        verified_at: verifiedAt.toISOString()
      }])
      .select();

    if (error) {
      console.error('Database insert error:', error);
      throw new Error(`Failed to create verification: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error('Failed to create verification: No data returned');
    }

    return data[0];
  }

  async findAllByUserCode(userCode: string): Promise<Verification[]> {
    const user = await this.usersService.getUserByCode(userCode);
    if (!user) {
      return [];
    }

    const { data, error } = await this.supabaseService
      .getClient()
      .from('verifications')
      .select('*')
      .eq('user_id', user.id)
      .order('verified_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async findTodayByUserCode(userCode: string): Promise<Verification[]> {
    const user = await this.usersService.getUserByCode(userCode);
    if (!user) {
      return [];
    }

    // 오늘 날짜의 시작과 끝 계산
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);

    const { data, error } = await this.supabaseService
      .getClient()
      .from('verifications')
      .select('*')
      .eq('user_id', user.id)
      .gte('verified_at', startOfDay.toISOString())
      .lte('verified_at', endOfDay.toISOString())
      .order('verified_at', { ascending: false });

    if (error) throw error;
    return data;
  }
} 