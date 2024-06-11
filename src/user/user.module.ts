import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserBadge } from 'src/user-badge/user-badge.entity';
import { BadgeModule } from 'src/badge/badge.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserBadge]),
    BadgeModule,  
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}