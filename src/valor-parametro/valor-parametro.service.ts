import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { Parametro } from 'src/parametros/entities/parametro.entity';
import { Repository } from 'typeorm';
import { CreateValorParametroInput } from './dto/inputs/create-valor-parametro.input';
import { UpdateValorParametroInput } from './dto/inputs/update-valor-parametro.input';
import { ValorParametro } from './entities/valor-parametro.entity';

@Injectable()
export class ValorParametroService {
  constructor(
    @InjectRepository(ValorParametro)
    private readonly valorParametroRepository: Repository<ValorParametro>,
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>
  ) { }
  async create(parametro: Parametro, createValorParametroInput: CreateValorParametroInput) {

    const newValorParametro = this.valorParametroRepository.create(createValorParametroInput)

    newValorParametro.parametro = parametro;

    await this.valorParametroRepository.save(newValorParametro)

    return newValorParametro;
  }

  findAll(paginationArgs: PaginationArgs) {
    const { limit, offset } = paginationArgs;

    return this.valorParametroRepository.find({
      take: limit,
      skip: offset,
      where: { deleted: false }
    });
  }

  async findOne(id: string): Promise<ValorParametro> {

    const valorParametro = await this.valorParametroRepository.findOneBy({ id, deleted: false });

    if (!valorParametro) throw new NotFoundException(`ValorParametro with id ${id} not found`);

    return valorParametro
  }

  async update(id: string, updateValorParametroInput: UpdateValorParametroInput) {
    const valorParametro = await this.valorParametroRepository.preload(updateValorParametroInput)

    if (!valorParametro) throw new NotFoundException(`Parametro with id ${id} not found`)

    return this.valorParametroRepository.save(valorParametro);
  }

  async remove(id: string) {
    const valorParametro = this.findOne(id)
    return valorParametro;
  }
}
