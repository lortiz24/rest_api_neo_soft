import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { SignupInput } from './dto/inputs/signup.inputs';
import { AuthResponse } from './types/auth-response.type';

@Injectable()
export class AuthService {

    async signup(signupInput: SignupInput): Promise<AuthResponse> {
        console.log(signupInput)
        //todo: crear usuario
        

        //todo: crear JWT
        /* return {
            token: '',
            user: new User()
        } */

        throw new Error('Not implemented');
    }
}
