import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParametrosService } from './parametros.service';
import { Parametro } from './entities/parametro.entity';
import { CreateParametroInput } from './dto/create-parametro.input';
import { UpdateParametroInput } from './dto/update-parametro.input';

@Resolver(() => Parametro)
export class ParametrosResolver {
  constructor(private readonly parametrosService: ParametrosService) {}

  @Mutation(() => Parametro)
  createParametro(
    @Args('createParametroInput') createParametroInput: CreateParametroInput,
  ): Promise<Parametro> {
    return this.parametrosService.create(createParametroInput);
  }

  @Query(() => [Parametro], { name: 'parametros' })
  findAll() {
    return this.parametrosService.findAll();
  }

  @Query(() => Parametro, { name: 'parametro' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parametrosService.findOne(id);
  }

  @Mutation(() => Parametro)
  updateParametro(
    @Args('updateParametroInput') updateParametroInput: UpdateParametroInput,
  ) {
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
