import { Controller, Get, Param } from '@nestjs/common';
import { BadgeService } from './badge.service';
import { Badge } from './badge.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('badges')
@Controller('eblemas')
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os emblemas registrados' })
  @ApiResponse({ status: 200, description: 'Emblemas retornados com sucesso', type: Badge, isArray: true })
  findAll(): Promise<Badge[]> {
    return this.badgeService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Resgatar emblemas pelo slug' })
  @ApiResponse({ status: 200, description: 'Emblema retornado com sucesso', type: Badge, isArray: true })
  findBySlug(@Param('slug') slug: string): Promise<Badge> {
    return this.badgeService.findBySlug(slug);
  }
}