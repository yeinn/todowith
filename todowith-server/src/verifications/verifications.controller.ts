import { Controller, Get, Post, Body, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VerificationsService } from './verifications.service';
import { CreateVerificationDto } from './interfaces/verification.interface';

@Controller('verifications')
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('userCode') userCode: string
  ) {
    return this.verificationsService.uploadImage(file, userCode);
  }

  @Post()
  create(@Body() createVerificationDto: CreateVerificationDto) {
    return this.verificationsService.create(createVerificationDto);
  }

  @Get()
  findAll(@Query('userCode') userCode: string) {
    return this.verificationsService.findAllByUserCode(userCode);
  }

  @Get('today')
  findToday(@Query('userCode') userCode: string) {
    return this.verificationsService.findTodayByUserCode(userCode);
  }
} 