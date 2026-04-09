import { CreateUserDto } from './../users/dto/create-user.dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ){

  }
  async create(createUserDto: CreateUserDto) {
      const existingUser = await this.userRepository.findOne({ where: { user_email: createUserDto.user_email }});
      if(existingUser) throw new ConflictException(`User with e-mail ${ createUserDto.user_email } already exists.`);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(createUserDto.user_password, salt);
      const user = this.userRepository.create({
        ...createUserDto,
        user_password: hashedPassword
      });
      return await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({ where: { user_email: loginDto.email}});
    if(!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.user_password);
    if(!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    const payload = { username: user.user_email, sub: user.user_id };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, { expiresIn: '15m' }),
      this.jwtService.signAsync({...payload, type: 'refresh'}, { expiresIn: '7d' })
    ])
    
    return {
      access_token,
      refresh_token
    }
  }

  async refresh(refreshToken: string){
    try{
      const payload = await this.jwtService.verifyAsync(refreshToken);

      if(payload.type !== 'refresh') throw new UnauthorizedException('Invalid or expired refresh token.');

      const newPayload = {
        sub: payload.sub,
        email: payload.email,
        type: 'access'
      }

      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(newPayload, { expiresIn: '15m' }),
        this.jwtService.signAsync({...newPayload, type: 'refresh'}, { expiresIn: '7d' })
      ])

      return {
        access_token,
        refresh_token
      }
    } catch(error){
      throw new UnauthorizedException('Invalid or expired refresh token.');
    } 
  }
}
