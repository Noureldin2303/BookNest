import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { PrismaService } from '../../prisma/db/connect.service';
import { User } from '@prisma/client';
import { UserEntity } from './entities/users.entity';
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async findOrCreate(user: UserEntity): Promise<User> {
    let existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      existingUser = await this.prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          password: '',
        },
      });
    }

    return existingUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    const updatedUser = { ...user, ...updateUserDto };

    return await this.prisma.user.update({ where: { id }, data: updatedUser });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error("User doesn't exist");
    }

    return await this.prisma.user.delete({ where: { id } });
  }
}
