import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';
import { META_ROLES } from '../decorators';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector, // ayuda a ver los metadatos de los decoradores
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {    
    const validRoles: string[] = this.reflector.get<string[]>(META_ROLES, context.getHandler());

    if (!validRoles || validRoles.length === 0)
    {
      return true;
    }
    
    // find user in request checking the token
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) {
      throw new BadRequestException('User not found in request');
    }

    for (const role of user.roles)
    {
      if (validRoles.includes(role))
      {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.fullName} with roles [${user.roles}] not allowed. Valid roles: [${validRoles}]`,
      'User not allowed to access this resource',
    )
  }
}
