import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from '../../user/users.service';
import { UserEntity } from '../../user/entities/users.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(
    user: UserEntity,
    done: (err: Error, user: UserEntity) => void,
  ): void {
    done(null, user);
  }

  async deserializeUser(
    user: UserEntity,
    done: (err: Error, user: UserEntity) => void,
  ): Promise<void> {
    const userFromDb = await this.userService.findOne(user.id.toString());
    done(null, { ...userFromDb, id: Number(userFromDb.id) });
  }
}
