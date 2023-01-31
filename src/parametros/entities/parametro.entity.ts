import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert, BeforeUpdate } from 'typeorm';
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

  @BeforeInsert()
  nombreToLowerCaseCreate() {
    this.nombre = this.nombre.toLowerCase()
  }
  @BeforeUpdate()
  nombreToLowerCaseUpdate() {
    if (this.nombre) this.nombre = this.nombre.toLowerCase()
  }
}
