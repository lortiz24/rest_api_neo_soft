import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ValorParametroService } from './valor-parametro.service';
import { ValorParametro } from './entities/valor-parametro.entity';
import { CreateValorParametroInput } from './dto/create-valor-parametro.input';
import { UpdateValorParametroInput } from './dto/update-valor-parametro.input';

@Resolver(() => ValorParametro)
export class ValorParametroResolver {
  constructor(private readonly valorParametroService: ValorParametroService) { }

  @Mutation(() => ValorParametro)
  async createValorParametro(@Args('createValorParametroInput') createValorParametroInput: CreateValorParametroInput): Promise<ValorParametro> {
    return this.valorParametroService.create(createValorParametroInput);
  }

  @Query(() => [ValorParametro], { name: 'getValorParametros' })
  async findAll(): Promise<ValorParametro[]> {
    return this.valorParametroService.findAll();
  }

  @Query(() => ValorParametro, { name: 'getValorParametro' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<ValorParametro> {
    return this.valorParametroService.findOne(id);
  }

  @Mutation(() => ValorParametro)
  updateValorParametro(@Args('updateValorParametroInput') updateValorParametroInput: UpdateValorParametroInput) {
    return this.valorParametroService.update(updateValorParametroInput.id, updateValorParametroInput);
  }

  @Mutation(() => ValorParametro)
  removeValorParametro(@Args('id', { type: () => Int }) id: number) {
    return this.valorParametroService.remove(id);
  }
}
