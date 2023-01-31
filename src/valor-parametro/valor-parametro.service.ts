import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateValorParametroInput } from './dto/create-valor-parametro.input';
import { UpdateValorParametroInput } from './dto/update-valor-parametro.input';
import { ValorParametro } from './entities/valor-parametro.entity';

@Injectable()
export class ValorParametroService {
  @InjectRepository(ValorParametro)
  private readonly valorParametroRepository: Repository<ValorParametro>
  async create(createValorParametroInput: CreateValorParametroInput) {
    const newParametro = this.valorParametroRepository.create(createValorParametroInput)
    await this.valorParametroRepository.save(newParametro)
    return newParametro;
  }

  findAll() {
    return this.valorParametroRepository.find();
  }

  async findOne(id: string): Promise<ValorParametro> {

    const valorParametro = await this.valorParametroRepository.findOneBy({ id });

    if (!valorParametro) throw new NotFoundException(`ValorParametro with id ${id} not found`);

    return valorParametro
  }

  update(id: number, updateValorParametroInput: UpdateValorParametroInput) {
    return `This action updates a #${id} valorParametro`;
  }

  remove(id: number) {
    return `This action removes a #${id} valorParametro`;
  }
}
