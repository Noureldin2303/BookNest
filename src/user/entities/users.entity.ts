import { IsEmail, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class UserEntity {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: string;

  @IsOptional()
  @Length(8, 20)
  password?: string;
}
