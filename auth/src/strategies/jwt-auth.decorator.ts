import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import JwtAuthGuard from 'src/guards/jwt-auth.guard';

/**
 * Guard for verifying token
 * @returns JwtAuth decorator
 */
export function JwtAuth() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());
}
