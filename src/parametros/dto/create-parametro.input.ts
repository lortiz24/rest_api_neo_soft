import { InputType, Field, } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateParametroInput {

  @IsString()
  @Field(() => String)
  nombre: string;
}
