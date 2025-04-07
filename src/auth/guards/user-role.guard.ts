import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector, // ayuda a ver los metadatos de los decoradores
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('UserRoleGuard');
    
    const validRoles: string[] = this.reflector.get<string[]>('roles', context.getHandler());
    console.log({ validRoles });
    
    
    return true;
  }
}
