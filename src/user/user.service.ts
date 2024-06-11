import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserBadge } from 'src/user-badge/user-badge.entity';
import { Badge } from 'src/badge/badge.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserBadge)
    private userBadgeRepository: Repository<UserBadge>,
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async redeemBadge(userId: number, badgeId: number): Promise<void> {
    const existingRedemption = await this.userBadgeRepository.findOne({ where: { user: { id: userId }, badge: { id: badgeId } } });
    if (existingRedemption) {
      throw new Error('Badge already redeemed by this user.');
    }
    const userBadge = new UserBadge();
    userBadge.user = await this.userRepository.findOne({ where: { id: userId } });
    userBadge.badge = await this.badgeRepository.findOne({ where: { id: badgeId } });
    await this.userBadgeRepository.save(userBadge);
  }

  findRedeemedBadges(userId: number): Promise<UserBadge[]> {
    return this.userBadgeRepository.find({ where: { user: { id: userId } }, relations: ['badge'] });
  }
}