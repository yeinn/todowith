import { Module } from '@nestjs/common';
import { VerificationsService } from './verifications.service';
import { VerificationsController } from './verifications.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [VerificationsController],
  providers: [VerificationsService, SupabaseService],
})
export class VerificationsModule {} 