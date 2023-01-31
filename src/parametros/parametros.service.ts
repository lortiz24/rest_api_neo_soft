import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationArgs } from './dto/args/pagination.args';
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
    const { limit = 10, offset = 0 } = paginationArgs;
    return this.parametroRepository.find({
      take: limit,
      skip: offset,
    });
  }

  findOne(id: string) {
    return this.parametroRepository.findOneBy({ id });
  }

  update(id: string, updateParametroInput: UpdateParametroInput) {
    const parametro = this.parametroRepository.preload(updateParametroInput)

    if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)

    return parametro;
  }

  remove(id: number) {
    return `This action removes a #${id} parametro`;
  }
}
