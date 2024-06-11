import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Badge } from './badge.entity';

@Injectable()
export class BadgeService {
  constructor(
    @InjectRepository(Badge)
    private badgeRepository: Repository<Badge>,
  ) {}

  async findAll(page: number = 1, limit: number = 10, name?: string): Promise<Badge[]> {
    let query = this.badgeRepository.createQueryBuilder('badge');

    if (name) {
      query = query.where('badge.name LIKE :name', { name: `%${name}%` });
    }

    return query
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  findBySlug(slug: string): Promise<Badge> {
    return this.badgeRepository.findOne({ where: { slug } });
  }
}

