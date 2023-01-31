import { Module } from '@nestjs/common';
import { ValorParametroService } from './valor-parametro.service';
import { ValorParametroResolver } from './valor-parametro.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorParametro } from './entities/valor-parametro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ValorParametro])],
  providers: [ValorParametroResolver, ValorParametroService]
})
export class ValorParametroModule { }
