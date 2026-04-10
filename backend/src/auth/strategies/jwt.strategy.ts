import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(config: ConfigService){
        super({
            secretOrKey: config.getOrThrow<string>('JWT_SECRET'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let token = null
                    if(req && req.cookies) {
                        token = req.cookies['access_token']
                    }
                    return token;
                }
            ])
        })

    }

    validate(payload: any){
        return { sub: payload.sub, username: payload.username }
    }
}