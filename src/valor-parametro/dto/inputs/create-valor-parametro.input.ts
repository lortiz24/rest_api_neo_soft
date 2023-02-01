import { InputType, Field, ID, } from '@nestjs/graphql';
import { IsString, IsUUID, MinLength } from 'class-validator';

@InputType()
export class CreateValorParametroInput {

  @IsString()
  @MinLength(1)
  @Field(() => String)
  nombre: string;

  

}
