import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BadgeModule } from './badge/badge.module';
import { UserModule } from './user/user.module';
import { Badge } from './badge/badge.entity';
import { User } from './user/user.entity';
import { UserBadge } from './user-badge/user-badge.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Badge, User, UserBadge],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BadgeModule,
    UserModule,
  ],
})
export class AppModule {}