import { CreateParametroInput } from './create-parametro.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateParametroInput extends PartialType(CreateParametroInput) {
  @Field(() => ID)
  id: string;
}
