import { PrimaryGeneratedColumn, Column, BeforeInsert, Entity } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';


@Entity({ name: 'valor_apametro' })
@ObjectType()
export class ValorParametro {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar')
  @Field(() => String)
  nombre: string;
  @BeforeInsert()
  noombreToLowerCase() {
    this.nombre = this.nombre.toLowerCase()
  }
}
