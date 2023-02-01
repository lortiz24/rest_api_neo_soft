import { InputType, Field, } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateParametroInput {

  @IsString()
  @MinLength(1)
  @Field(() => String)
  nombre: string;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  valoresParametro?: string[];
}
