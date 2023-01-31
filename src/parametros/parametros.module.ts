import { Module } from '@nestjs/common';
import { ParametrosService } from './parametros.service';
import { ParametrosResolver } from './parametros.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parametro } from './entities/parametro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Parametro])
  ],
  providers: [ParametrosResolver, ParametrosService],
})
export class ParametrosModule { }
