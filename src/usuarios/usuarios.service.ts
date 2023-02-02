import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService')


  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }
  async create(createUsuarioInput: CreateUsuarioInput): Promise<Usuario> {

    try {
      const newUsuario = this.usuarioRepository.create({
        ...createUsuarioInput,
      })

      await this.usuarioRepository.save(newUsuario)

      return newUsuario;
      
    } catch (error) {
      this.handleDbExceptions(error);
    }
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: string, updateUsuarioInput: UpdateUsuarioInput) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

  handleDbExceptions(error: any) {
    if (error.code === '23505')
      throw new BadRequestException(error.detail);
    if (error.status == '404')
      throw new NotFoundException(error.detail);
    this.logger.error(`${error} - ${error.code}`)
    throw new InternalServerErrorException('Inexpected error, check server logs')
  }


}
