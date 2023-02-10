import { Mutation, Query, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.inputs';
import { AuthResponse } from './types/auth-response.type';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Mutation(() => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  // @Mutation(/**/ , { name: 'login' })
  // async login(

  // ): Promise<any> {
  //   // return this.authService.login();
  // }

  // @Query(...,{name: 'revalite'})
  // revaliteToken(){
  //   // return this.authService.revaliteToken();
  // }
}
