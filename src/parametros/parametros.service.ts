import { Injectable } from '@nestjs/common';
import { CreateParametroInput } from './dto/create-parametro.input';
import { UpdateParametroInput } from './dto/update-parametro.input';

@Injectable()
export class ParametrosService {
  create(createParametroInput: CreateParametroInput) {
    return 'This action adds a new parametro';
  }

  findAll() {
    return `This action returns all parametros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parametro`;
  }

  update(id: number, updateParametroInput: UpdateParametroInput) {
    return `This action updates a #${id} parametro`;
  }

  remove(id: number) {
    return `This action removes a #${id} parametro`;
  }
}
