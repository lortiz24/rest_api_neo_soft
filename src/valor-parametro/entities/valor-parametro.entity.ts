import { PrimaryGeneratedColumn, Column, BeforeInsert, Entity, BeforeUpdate, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Parametro } from 'src/parametros/entities/parametro.entity';


@Entity({ name: 'valor_parametro' })
@ObjectType()
export class ValorParametro {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar', { unique: true })
  @Field(() => String)
  nombre: string;


  @ManyToOne(
    () => Parametro,
    (parametro) => parametro.valoresParametros,
  )
  parametro: Parametro;






  @BeforeInsert()
  nombreToLowerCaseCreate() {
    this.nombre = this.nombre.toLowerCase()
  }
  @BeforeUpdate()
  nombreToLowerCaseUpdate() {
    if (this.nombre) this.nombre = this.nombre.toLowerCase()
  }
}
