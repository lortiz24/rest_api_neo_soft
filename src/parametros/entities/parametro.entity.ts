import { PrimaryGeneratedColumn, Column, Entity, BeforeInsert, BeforeUpdate, Unique, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ValorParametro } from 'src/valor-parametro/entities/valor-parametro.entity';

@Entity({ name: 'parametros' })
@ObjectType()
export class Parametro {
  
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar')
  @Field(() => String)
  nombre: string;


  @OneToMany(
    () => ValorParametro,
    (valorParametro) => valorParametro.parametro,
    { cascade: true, eager: true }
  )
  valoresParametros:ValorParametro[]

  @Column('boolean', { nullable: true, default: false })
  @Field(() => Boolean)
  deleted: boolean;




  @BeforeInsert()
  nombreToLowerCaseCreate() {
    this.nombre = this.nombre.toLowerCase()
  }
  @BeforeUpdate()
  nombreToLowerCaseUpdate() {
    if (this.nombre) this.nombre = this.nombre.toLowerCase()
  }
}
