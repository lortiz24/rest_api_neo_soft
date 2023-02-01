import { CreateValorParametroInput } from './create-valor-parametro.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateValorParametroInput extends PartialType(CreateValorParametroInput) {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
