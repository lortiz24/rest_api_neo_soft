import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Parametro {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
