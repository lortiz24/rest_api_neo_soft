import { Injectable } from '@nestjs/common';
import { CreateParametroInput } from './dto/create-parametro.input';
import { UpdateParametroInput } from './dto/update-parametro.input';
import { Parametro } from './entities/parametro.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ParametrosService {
  constructor(
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>
  ) { }
  async create(createParametroInput: CreateParametroInput) {
    console.log(createParametroInput)
    const newParametro = this.parametroRepository.create(createParametroInput)
    console.log(newParametro,'fefefe')
    await this.parametroRepository.save(newParametro)
    return createParametroInput;
  }

  findAll() {
    return `This action returns all parametros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parametro`;
  }

  update(id: string, updateParametroInput: UpdateParametroInput) {
    return `This action updates a #${id} parametro`;
  }

  remove(id: number) {
    return `This action removes a #${id} parametro`;
  }
}
