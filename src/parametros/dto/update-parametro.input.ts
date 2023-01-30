import { CreateParametroInput } from './create-parametro.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateParametroInput extends PartialType(CreateParametroInput) {
  @Field(() => Int)
  id: number;
}
