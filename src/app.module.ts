import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ParametrosModule } from './parametros/parametros.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorParametroModule } from './valor-parametro/valor-parametro.module';
import { CommonModule } from './common/common.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    /* GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      useFactory: async (jwtService: JwtService) => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [
          ApolloServerPluginLandingPageLocalDefault
        ],
        context({ req }) {
          // const token = req.headers.authorization?.replace('Bearer ','');
          // if ( !token ) throw Error('Token needed');

          // const payload = jwtService.decode( token );
          // if ( !payload ) throw Error('Token not valid');

        }
      })
    }), */
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.STATE === 'dev' ? true : false,
      autoLoadEntities: true,
    }),
    ParametrosModule,
    ValorParametroModule,
    CommonModule,
    UsuariosModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
