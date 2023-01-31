import { InputType, Field, } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateValorParametroInput {

  @IsString()
  @Field(() => String)
  nombre: string;
}
