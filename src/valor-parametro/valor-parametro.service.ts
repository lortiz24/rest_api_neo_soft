import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { HelperServices } from 'src/common/helpers/handled-error.helper';
import { Parametro } from 'src/parametros/entities/parametro.entity';
import { Repository } from 'typeorm';
import { CreateValorParametroInput } from './dto/inputs/create-valor-parametro.input';
import { UpdateValorParametroInput } from './dto/inputs/update-valor-parametro.input';
import { ValorParametro } from './entities/valor-parametro.entity';

@Injectable()
export class ValorParametroService {
  private readonly logger = new Logger('ValorParametroService')
  private readonly HelperServices = new HelperServices('ValorParametroService')

  constructor(
    @InjectRepository(ValorParametro)
    private readonly valorParametroRepository: Repository<ValorParametro>
  ) { }
  async create(parametro: Parametro, createValorParametroInput: CreateValorParametroInput) {

    try {
      const newValorParametro = this.valorParametroRepository.create(createValorParametroInput)

      newValorParametro.parametro = parametro;

      await this.valorParametroRepository.save(newValorParametro)

      return newValorParametro;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }

  findAll(paginationArgs: PaginationArgs) {
    try {
      const { limit, offset } = paginationArgs;
      return this.valorParametroRepository.find({
        take: limit,
        skip: offset
      });
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }

  async findOne(id: string): Promise<ValorParametro> {

    try {
      const valorParametro = await this.valorParametroRepository.findOneBy({ id });

      if (!valorParametro) throw new NotFoundException(`ValorParametro with id ${id} not found`);

      return valorParametro
    } catch (error) {
      this.HelperServices.handleDbExceptions(error);
    }
  }

  async update(id: string, updateValorParametroInput: UpdateValorParametroInput) {
    try {
      const valorParametro = await this.valorParametroRepository.preload(updateValorParametroInput)

      if (!valorParametro) throw new NotFoundException(`Parametro with id ${id} not found`)

      const valorParametroUpdated = await this.valorParametroRepository.save(valorParametro);

      return valorParametroUpdated;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }

  async remove(id: string): Promise<ValorParametro> {
    try {
      const valorParametro = await this.findOne(id);

      await this.valorParametroRepository.remove(valorParametro)
      valorParametro.id = id;
      return valorParametro;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }

}
