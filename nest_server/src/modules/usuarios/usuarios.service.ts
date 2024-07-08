import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usersRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const nuevoUsuario = new Usuario();
    nuevoUsuario.nombreUsuario = createUsuarioDto.nombreUsuario;
    nuevoUsuario.equipoId = createUsuarioDto.equipoId;
    nuevoUsuario.numero = createUsuarioDto.numero;

    const userCreated = await this.usersRepository.save(nuevoUsuario);
    return userCreated;
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usersRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario with ID ${id} not found`);
    }
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.nombreUsuario = updateUsuarioDto.nombreUsuario ?? usuario.nombreUsuario;
    usuario.equipoId = updateUsuarioDto.equipoId ?? usuario.equipoId;
    usuario.numero = updateUsuarioDto.numero ?? usuario.numero;

    const usuarioActualizado = await this.usersRepository.save(usuario);
    return usuarioActualizado;
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usersRepository.remove(usuario);
  }
}
