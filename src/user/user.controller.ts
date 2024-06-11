import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserBadge } from 'src/user-badge/user-badge.entity';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuarios registrados' })
  @ApiResponse({ status: 200, description: 'Emblemas retornados com sucesso', type: User, isArray: true })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id/badges')
  @ApiOperation({ summary: 'Listar emblemas resgatados por um usuário específico' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Emblemas resgatados retornados com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findRedeemedBadges(@Param('id') id: number): Promise<UserBadge[]> {
    return this.userService.findRedeemedBadges(id);
  }

  @Post(':id/redeem')
  @ApiOperation({ summary: 'Resgatar um emblema' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ schema: { example: { badgeId: 1 } } })
  @ApiResponse({ status: 201, description: 'Emblema resgatado com sucesso' })
  @ApiResponse({ status: 400, description: 'Emblema já resgatado ou dados inválidos' })
  redeemBadge(@Param('id') id: number, @Body() redeemBadgeDto: { badgeId: number }): Promise<void> {
    return this.userService.redeemBadge(id, redeemBadgeDto.badgeId);
  }
}