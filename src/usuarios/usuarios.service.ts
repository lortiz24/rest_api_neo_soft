import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupInput } from 'src/auth/dto/inputs';
import { HelperServices } from 'src/common/helpers/handled-error.helper';
import { Repository } from 'typeorm';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Usuario } from './entities/usuario.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuariosService {
  private readonly logger = new Logger('UsuariosService')
  private readonly HelperServices = new HelperServices('UsuariosService')


  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }
  async create(signupInput: SignupInput): Promise<Usuario> {

    try {

      const newUser = this.usuarioRepository.create({
        ...signupInput,
        password: bcrypt.hashSync(signupInput.password, 10)
      });

      return await this.usuarioRepository.save(newUser);

    } catch (error) {
      this.HelperServices.handleDbExceptions(error);
    }

  }

  async findAll(): Promise<Usuario[]> {
    try {
      return [];
    } catch (error) {
      this.HelperServices.handleDbExceptions(error);
    }
  }


  async findOneByEmail(email: string): Promise<Usuario> {
    try {
      return await this.usuarioRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException(`${email} not found`);
      // this.handleDBErrors({
      //   code: 'error-001',
      //   detail: `${ email } not found`
      // });
    }
  }

  async findOneById(id: string): Promise<Usuario> {
    try {
      return await this.usuarioRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException(`${id} not found`);
    }
  }

  update(id: string, updateUsuarioInput: UpdateUsuarioInput) {
    try {
      return `This action updates a #${id} usuario`;
    } catch (error) {
      this.HelperServices.handleDbExceptions(error);
    }
  }

  block(id: string) {
    try {
      throw new Error('No implemenado');
    } catch (error) {
      this.HelperServices.handleDbExceptions(error)
    }
  }
}
