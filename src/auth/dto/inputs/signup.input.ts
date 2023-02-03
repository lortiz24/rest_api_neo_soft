import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

//todo: checkt option fields
@InputType()
export class SignupInput {


    @IsNotEmpty()
    @Field(() => String)
    nombres: string;

    @IsNotEmpty()
    @Field(() => String)
    primer_apellido: string;

    @IsNotEmpty()
    @Field(() => String)
    segundo_apellido: string;

    @IsNotEmpty()
    @Field(() => String)
    tipo_identificacion: string;

    @IsNotEmpty()
    @Field(() => String)
    identificacion: string;

    @IsNotEmpty()
    @MinLength(1)
    @Field(() => String)
    genero: string;

    @IsDateString()
    @Field(() => String)
    fecha_nacimiento: string;

    @IsDateString()
    @Field(() => String)
    fecha_registro: string;

    @IsNotEmpty()
    @Field(() => String)
    username: string;

    @Field(() => String)
    @IsEmail()
    email: string;


    @Field(() => String)
    @MinLength(6)
    password: string;


}