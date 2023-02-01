import { CreateParametroInput } from './create-parametro.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateParametroInput extends PartialType(CreateParametroInput) {
  @IsUUID()
  @Field(() => ID)
  id: string;
}
