import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/createuser.dto';
import * as bycrpt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/users.service';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../user/entities/users.entity';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(userData: CreateUserDto) {
    const user = await this.userService.findByEmail(userData.email);

    if (user) {
      throw new Error('email already exists');
    }

    const salt = await bycrpt.genSalt(10);
    const hashedPassword = await bycrpt.hash(userData.password, salt);

    const createdUser = {
      ...userData,
      password: hashedPassword,
    };

    await this.userService.create(createdUser);

    const token = await this.jwtService.signAsync({ email: userData.email });

    return { token };
  }

  async login(authData: any) {
    const { email, password } = authData;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bycrpt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({
      email: user.email,
      role: user.role,
    });

    return { token };
  }

  async getProfile(id: string) {
    return this.userService.findOne(id);
  }

  async googleLogin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    const user = plainToClass(UserEntity, req.user);
    await validateOrReject(user);
    const savedUser = await this.userService.findOrCreate(user);
    return savedUser;
  }
}
