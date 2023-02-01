import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { Repository } from 'typeorm';
import { CreateParametroInput } from './dto/inputs/create-parametro.input';
import { UpdateParametroInput } from './dto/inputs/update-parametro.input';
import { Parametro } from './entities/parametro.entity';
@Injectable()
export class ParametrosService {
  constructor(
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>
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
    });
  }

  async findOne(id: string) {
    const parametro = await this.parametroRepository.findOneBy({ id });

    if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)

    return parametro;
  }

  async update(id: string, updateParametroInput: UpdateParametroInput) {
    const parametro = await this.parametroRepository.preload(updateParametroInput)

    if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)

    return this.parametroRepository.save(parametro);
  }

  remove(id: number) {
    return `This action removes a #${id} parametro`;
  }
}
