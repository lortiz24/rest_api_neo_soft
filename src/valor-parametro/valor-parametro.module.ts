import { Module } from '@nestjs/common';
import { ValorParametroService } from './valor-parametro.service';
import { ValorParametroResolver } from './valor-parametro.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorParametro } from './entities/valor-parametro.entity';
import { Parametro } from 'src/parametros/entities/parametro.entity';
import { ParametrosService } from 'src/parametros/parametros.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ValorParametro, Parametro])
  ],
  providers: [ValorParametroResolver, ValorParametroService, ParametrosService]
})
export class ValorParametroModule { }
