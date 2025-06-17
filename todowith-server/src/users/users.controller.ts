import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async createUser() {
    return this.usersService.createUser();
  }

  @Get('code/:userCode')
  async getUserByCode(@Param('userCode') userCode: string) {
    return this.usersService.getUserByCode(userCode);
  }
} 