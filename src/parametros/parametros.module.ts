import { Module } from '@nestjs/common';
import { ParametrosService } from './parametros.service';
import { ParametrosResolver } from './parametros.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parametro } from './entities/parametro.entity';
import { ValorParametro } from 'src/valor-parametro/entities/valor-parametro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parametro, ValorParametro])
  ],
  providers: [ParametrosResolver, ParametrosService],
})
export class ParametrosModule { }
