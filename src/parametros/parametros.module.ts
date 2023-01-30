import { Module } from '@nestjs/common';
import { ParametrosService } from './parametros.service';
import { ParametrosResolver } from './parametros.resolver';

@Module({
  providers: [ParametrosResolver, ParametrosService],
})
export class ParametrosModule {}
