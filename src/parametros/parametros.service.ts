import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { ValorParametro } from 'src/valor-parametro/entities/valor-parametro.entity';
import { Repository } from 'typeorm';
import { CreateParametroInput } from './dto/inputs/create-parametro.input';
import { UpdateParametroInput } from './dto/inputs/update-parametro.input';
import { Parametro } from './entities/parametro.entity';
@Injectable()
export class ParametrosService {
  private readonly logger = new Logger('ValorParametroService')
  constructor(
    @InjectRepository(Parametro)
    private readonly parametroRepository: Repository<Parametro>,
    @InjectRepository(ValorParametro)
    private readonly valorParametroRepository: Repository<ValorParametro>
  ) { }
  async create({ valoresParametro, ...createParametroInput }: CreateParametroInput): Promise<Parametro> {

    try {
      const newParametro = this.parametroRepository.create({
        ...createParametroInput,
        valoresParametros: valoresParametro.map((valorParametro) => this.valorParametroRepository.create({ nombre: valorParametro }))
      })

      await this.parametroRepository.save(newParametro)

      return newParametro;
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async findAll(paginationArgs: PaginationArgs) {
    const { limit, offset } = paginationArgs;
    const parametros = await this.parametroRepository.find({
      take: limit,
      skip: offset,
      relations: {
        valoresParametros: true
      },
      where: { deleted: false }
    });
    return parametros;
  }

  async findOne(id: string) {
    //todo: buscar por nombre
    const parametro = await this.parametroRepository.findOneBy({ id, deleted: false });

    if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)

    return parametro;
  }

  async update(id: string, { valoresParametro, ...updateParametroInput }: UpdateParametroInput) {
    try {
      const parametro = await this.parametroRepository.preload(updateParametroInput)

      if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)
      //todo: update valores parametro
      // if (valoresParametro) {
      //   parametro.valoresParametros = valoresParametro.map((valorParametro) => this.valorParametroRepository.create({ nombre: valorParametro }))
      // }
      const parametroUpdate = await this.parametroRepository.save(parametro);
      return parametroUpdate;
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  async remove(id: string) {
    const parametro = await this.findOne(id);

    parametro.deleted = true;

    await this.parametroRepository.save(parametro)

    return parametro;
  }
  handleDbExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    this.logger.error(`${error} - ${error.code}`)
    throw new InternalServerErrorException('Inexpected error, check server logs')
  }
}
