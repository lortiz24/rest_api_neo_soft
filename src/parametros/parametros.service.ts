import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { HelperServices } from 'src/common/helpers/handled-error.helper';
import { ValorParametro } from 'src/valor-parametro/entities/valor-parametro.entity';
import { Repository } from 'typeorm';
import { CreateParametroInput } from './dto/inputs/create-parametro.input';
import { UpdateParametroInput } from './dto/inputs/update-parametro.input';
import { Parametro } from './entities/parametro.entity';
@Injectable()
export class ParametrosService {
  private readonly logger = new Logger('ParametrosService')
  private readonly HelperServices = new HelperServices('ParametrosService')

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
        valoresParametros: valoresParametro?.map((valorParametro) => this.valorParametroRepository.create({ nombre: valorParametro }))
      })

      await this.parametroRepository.save(newParametro)

      return newParametro;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }

  async findAll(paginationArgs: PaginationArgs) {
    try {
      const { limit, offset } = paginationArgs;
      const parametros = await this.parametroRepository.find({
        take: limit,
        skip: offset,
        relations: {
          valoresParametros: true
        }

      });
      return parametros;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error);
    }
  }

  async findOne(term: string) {
    try {
      let parametro: Parametro;

      if (isUUID(term)) {
        parametro = await this.parametroRepository.findOneBy({ id: term });
      } else {
        const queryBuilder = this.parametroRepository.createQueryBuilder('parm')
        parametro = await queryBuilder
          .where('UPPER(parm.nombre) =:nombre', {
            nombre: term.toUpperCase(),
          })
          .leftJoinAndSelect('parm.valoresParametros', 'valorP')
          .getOne();
      }

      if (!parametro) throw new NotFoundException('No se encontraron resultados');

      return parametro;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }

  }

  async update(id: string, { valoresParametro, ...updateParametroInput }: UpdateParametroInput) {
    try {
      const parametro = await this.parametroRepository.preload(updateParametroInput)

      if (!parametro) throw new NotFoundException(`Parametro with id ${id} not found`)
      //todo: update valores parametro
      if (valoresParametro.length > 0) {
        parametro.valoresParametros = [...parametro.valoresParametros, ...valoresParametro.map((valorParametro) => this.valorParametroRepository.create({ nombre: valorParametro }))]
      }
      const parametroUpdate = await this.parametroRepository.save(parametro);
      return parametroUpdate;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }

  async remove(id: string) {
    try {
      const parametro = await this.findOne(id);

      await this.parametroRepository.remove(parametro)
      parametro.id = id
      return parametro;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }

}
