import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateParametroInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
