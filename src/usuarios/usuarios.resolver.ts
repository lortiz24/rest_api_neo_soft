import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Usuario)
export class UsuariosResolver {

  constructor(private readonly usuariosService: UsuariosService) { }



  @Query(() => [Usuario], { name: 'usuarios' })
  findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  /*   @Query(() => Usuario, { name: 'usuario' })
    findOne(@Args('id', { type: () => Int }) id: number) {
      return this.usuariosService.findOne(id);
    } */

  /*  @Mutation(() => Usuario)
   updateUsuario(@Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput) {
     return this.usuariosService.update(updateUsuarioInput.id, updateUsuarioInput);
   } */

  @Mutation(() => Usuario)
  blockUser(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.usuariosService.block(id);
  }


}
