import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParametrosService } from './parametros.service';
import { Parametro } from './entities/parametro.entity';
import { CreateParametroInput } from './dto/inputs/create-parametro.input';
import { UpdateParametroInput } from './dto/inputs/update-parametro.input';
import { PaginationArgs } from './dto/args/pagination.args';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Parametro)
export class ParametrosResolver {
  constructor(private readonly parametrosService: ParametrosService) { }

  @Mutation(() => Parametro)
  async createParametro(
    @Args('createParametroInput') createParametroInput: CreateParametroInput,
  ): Promise<Parametro> {
    return this.parametrosService.create(createParametroInput);
  }


  @Query(() => [Parametro], { name: 'getParametros' })
  async findAll(
    @Args('paginationArgs') paginationArgs: PaginationArgs
  ) {
    return this.parametrosService.findAll(paginationArgs);
  }

  @Query(() => Parametro, { name: 'getParametro' })
  async findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Parametro> {
    return this.parametrosService.findOne(id);
  }

  @Mutation(() => Parametro)
  async updateParametro(
    @Args('updateParametroInput') updateParametroInput: UpdateParametroInput,
  ): Promise<Parametro> {
    return this.parametrosService.update(
      updateParametroInput.id,
      updateParametroInput,
    );
  }

  @Mutation(() => Parametro)
  removeParametro(@Args('id', { type: () => Int }) id: number) {
    return this.parametrosService.remove(id);
  }


  //todo: beforeInser and beforeUpdate
}
