import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ValorParametroService } from './valor-parametro.service';
import { ValorParametro } from './entities/valor-parametro.entity';
import { CreateValorParametroInput } from './dto/inputs/create-valor-parametro.input';
import { UpdateValorParametroInput } from './dto/inputs/update-valor-parametro.input';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { ParseUUIDPipe } from '@nestjs/common';
import { ParametrosService } from 'src/parametros/parametros.service';

@Resolver(() => ValorParametro)
export class ValorParametroResolver {
  constructor(
    private readonly valorParametroService: ValorParametroService,
    private readonly parametrosService: ParametrosService
  ) { }

  @Mutation(() => ValorParametro)
  async createValorParametro(
    @Args('createValorParametroInput') createValorParametroInput: CreateValorParametroInput,
    @Args('idParametro', ParseUUIDPipe) idParametro: string
  ): Promise<ValorParametro> {
    const parametro = await this.parametrosService.findOne(idParametro);

    return this.valorParametroService.create(parametro, createValorParametroInput);
  }

  @Query(() => [ValorParametro], { name: 'getValorParametros' })
  async findAll(
    @Args() paginationArgs: PaginationArgs
  ): Promise<ValorParametro[]> {
    return this.valorParametroService.findAll(paginationArgs);
  }

  @Query(() => ValorParametro, { name: 'getValorParametro' })
  async findOne(
    @Args('id', { type: () => ID }) id: string
  ): Promise<ValorParametro> {
    return this.valorParametroService.findOne(id);
  }

  @Mutation(() => ValorParametro)
  async updateValorParametro(
    @Args('updateValorParametroInput') updateValorParametroInput: UpdateValorParametroInput
  ): Promise<ValorParametro> {
    return this.valorParametroService.update(updateValorParametroInput.id, updateValorParametroInput);
  }

  @Mutation(() => ValorParametro)
  async removeValorParametro(
    @Args('id', { type: () => ID },ParseUUIDPipe) id: string
  ): Promise<ValorParametro> {
    return this.valorParametroService.remove(id);
  }
}
