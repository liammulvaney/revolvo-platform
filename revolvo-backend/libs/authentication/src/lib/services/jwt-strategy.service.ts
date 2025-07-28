import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Algorithm } from 'jsonwebtoken';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.PRIVATE_JWT_KEY_DIRECTORY || 'test', // Use your private key directory
            algorithms: [process.env.JWT_ALGORITHM as Algorithm || 'RS256'], // Specify the algorithm used for signing the JWT
        });
    }

    async validate(userLoginDTO: { username: string, password: string }): Promise<any> {
        return userLoginDTO;        
    }
}
