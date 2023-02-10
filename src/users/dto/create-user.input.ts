import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateUserInput {

  @IsString()
  @Field(() => String)
  username: string;

  @IsString()
  @Field(() => String)
  email: string;

  @IsArray()
  @Field(() => [String])
  roles: string[]


  @Column('varchar')
  @Field(() => String)
  password: string;
  @Column('varchar')
  @Field(() => String)
  fullname: string;

  @Column('varchar')
  @Field(() => String)
  tipo_identificacion: string;

  @Column('varchar', { unique: true })
  @Field(() => String)
  identificacion: string;

  @Column('varchar')
  @Field(() => String)
  genero: string;

  @Column('date')
  @Field(() => String)
  fecha_nacimiento: string;

  @Column('date')
  @Field(() => String)
  fecha_registro: string;


  @Field(() => Boolean)
  isActive: boolean
}
