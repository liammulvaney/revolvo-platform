import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtAuthGuard } from './jwtAuthGuard';

@Injectable()
export class AuthGuard extends JwtAuthGuard {
    
    constructor(private reflector: Reflector) {
        super();
    }

    override canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(), // what will happen next after this guard is executed
            context.getClass() // get the controller class as well
        ]);

        if (isPublic) {
            return true; // If the route is public, skip authentication
        }

        return super.canActivate(context); // Otherwise, use the JWT auth guard
    }
}