import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  fullName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  @Field(() => [String])
  roles: string[];

  @Column({
    type: 'boolean',
    default: true
  })

  @Column('varchar')
  @Field(() => String)
  username: string;

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

  @Field(() => Boolean)
  isActive: boolean;

}
