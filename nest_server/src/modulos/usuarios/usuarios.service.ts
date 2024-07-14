import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const nuevoUsuario = new Usuario()
    nuevoUsuario.nombreUsuario = createUsuarioDto.nombreUsuario;
    nuevoUsuario.equipoId = createUsuarioDto.equipoId;

    const contraseña = createUsuarioDto.password

    const passwordEncriptada = await hash(contraseña, 10);
    const nuevoUsuarioContraseña = {...nuevoUsuario, password:passwordEncriptada};

    const usuarioCreado = await this.usersRepository.save(nuevoUsuarioContraseña)

    return usuarioCreado;
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
