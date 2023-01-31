import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Entity({ name: 'parametros' })
@ObjectType()
export class Parametro {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar')
  @Field(() => String)
  nombre: string;
}
