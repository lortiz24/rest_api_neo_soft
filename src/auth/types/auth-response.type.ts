import { Field, ObjectType } from '@nestjs/graphql';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@ObjectType()
export class AuthResponse {

    @Field(() => String)
    token: string;

    @Field(() => Usuario)
    user: Usuario;

}
