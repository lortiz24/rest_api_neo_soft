import { InputType, Field, } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateParametroInput {

  @IsString()
  @MinLength(1)
  @Field(() => String)
  nombre: string;
}
