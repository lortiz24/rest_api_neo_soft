import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';


@Entity({ name: 'usuario' })
@ObjectType()
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('varchar')
  @Field(() => String)
  nombres: string;

  @Column('varchar')
  @Field(() => String)
  primer_apellido: string;

  @Column('varchar')
  @Field(() => String)
  segundo_apellido: string;

  @Column('varchar')
  @Field(() => String)
  tipo_identificacion: string;

  @Column('varchar', { unique: true })
  @Field(() => String)
  identificacion: string;

  @Column('varchar')
  @Field(() => String)
  genero: string;

  @Column('date')
  @Field(() => String)
  fecha_nacimiento: string;

  @Column('date')
  @Field(() => String)
  fecha_registro: string;

  @Column('varchar')
  @Field(() => String)
  username: string;

  @Column('varchar', { unique: true })
  @Field(() => String)
  email: string;

  @Column('varchar')
  @Field(() => String)
  password: string;


  @Column('boolean', { nullable: true, default: false })
  @Field(() => Boolean)
  deleted: boolean;
}
