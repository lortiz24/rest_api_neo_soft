import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsDateString, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUsuarioInput {

  @IsString()
  @MinLength(1)
  @Field(() => String)
  nombres: string;

  @IsString()
  @MinLength(1)
  @Field(() => String)
  primer_apellido: string;

  @IsString()
  @MinLength(1)
  @Field(() => String)
  segundo_apellido: string;

  @IsString()
  @MinLength(1)
  @Field(() => String)
  tipo_identificacion: string;

  @IsString()
  @MinLength(1)
  @Field(() => String)
  identificacion: string;

  @IsString()
  @MinLength(1)
  @Field(() => String)
  genero: string;

  @IsDateString()
  @Field(() => String)
  fecha_nacimiento: string;

  @IsDateString()
  @Field(() => String)
  fecha_registro: string;

  @IsString()
  @MinLength(1)
  @Field(() => String)
  username: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @IsString()
  @MinLength(1)
  @Field(() => String)
  password: string;



  //Input de la sfilas relacionadas
  /* @IsOptional()
  @Field(() => [String], { nullable: true })
  valoresParametro?: string[]; */
}
