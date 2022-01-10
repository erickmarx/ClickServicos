import { Body, Controller, Delete, Post, Req } from '@nestjs/common';
import {  IReqCreate } from './dto/body-create.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() body: IReqCreate) {
    return await this.userService.createUser(body);
  }
  @Delete('delete')
  async deleteAllUsers(): Promise<void> {
    return await this.userService.deleteUsers();
  }
}
