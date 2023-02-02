import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { SignupInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }

    private getJwtToken(userId: string) {
        return this.jwtService.sign({ id: userId });
    }


    async signup(signupInput: SignupInput): Promise<AuthResponse> {

        const user = await this.usersService.create(signupInput);

        const token = this.getJwtToken(user.id);

        return { token, user };
    }


    async login(loginInput: LoginInput): Promise<AuthResponse> {

        const { email, password } = loginInput;
        const user = await this.usersService.findOneByEmail(email);

        if (!bcrypt.compareSync(password, user.password)) {
            throw new BadRequestException('Email / Password do not match');
        }

        const token = this.getJwtToken(user.id);

        return {
            token,
            user
        }
    }


    async validateUser(id: string): Promise<Usuario> {

        const user = await this.usersService.findOneById(id);

        if (!user.isActive)
            throw new UnauthorizedException(`Usuario is inactive, talk with an admin`);

        delete user.password;

        return user;
    }


    revalidateToken(user: Usuario): AuthResponse {

        const token = this.getJwtToken(user.id);

        return { token, user };

    }

}


