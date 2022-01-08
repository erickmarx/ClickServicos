import { Body } from '@nestjs/common';
import {IsEmail, IsNotEmpty, IsString, MinLength, IsOptional, IsAlphanumeric} from 'class-validator'
export class IReqCreate{
  @IsString()
  @MinLength(5)
  @IsOptional()
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  @MinLength(8)
  password: any;
}