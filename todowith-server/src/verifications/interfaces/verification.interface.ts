export interface Verification {
  id: string;
  user_id: string;
  image_url: string;
  verified_at: Date;
}

export interface CreateVerificationDto {
  userCode: string;
  image_url: string;
}

// 파일 업로드용 DTO (실제로는 Body에서 userCode만 받고, 파일은 별도로 처리)
export interface UploadVerificationDto {
  userCode: string;
} 