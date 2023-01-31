import { CreateValorParametroInput } from './create-valor-parametro.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateValorParametroInput extends PartialType(CreateValorParametroInput) {
  @Field(() => Int)
  id: number;
}
