import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { ValorParametro } from 'src/valor-parametro/entities/valor-parametro.entity';
import { Repository } from 'typeorm';
import { CreateParametroInput } from './dto/inputs/create-parametro.input';
import { UpdateParametroInput } from './dto/inputs/update-parametro.input';
import { Parametro } from './entities/parametro.entity';
@Injectable()
export class ParametrosService {
  constructor(
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>,
    @InjectRepository(ValorParametro)
    private readonly productImageRepository: Repository<ValorParametro>
  ) { }
  async create(createParametroInput: CreateParametroInput): Promise<Parametro> {

    const newParametro = this.parametroRepository.create(createParametroInput)

    await this.parametroRepository.save(newParametro)

    return newParametro;
  }

  findAll(paginationArgs: PaginationArgs) {
    const { limit, offset } = paginationArgs;

    return this.parametroRepository.find({
      take: limit,
      skip: offset,
      where: { deleted: false }
    });
  }

  async findOne(id: string) {
    const parametro = await this.parametroRepository.findOneBy({ id, deleted: false });

    if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)

    return parametro;
  }

  async update(id: string, updateParametroInput: UpdateParametroInput) {
    const parametro = await this.parametroRepository.preload(updateParametroInput)

    if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)

    return this.parametroRepository.save(parametro);
  }

  async remove(id: string) {
    const parametro = await this.findOne(id);
    parametro.deleted = true;
    await this.parametroRepository.save(parametro)
    return parametro;
  }
}
