import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquiposService {
  constructor(
    @InjectRepository(Equipo)
    private equipoRepository: Repository<Equipo>
  ) {}

  async create(createEquipoDto: CreateEquipoDto): Promise<Equipo> {
    const nuevoEquipo = new Equipo();
    nuevoEquipo.nombreEquipo = createEquipoDto.nombre;
    nuevoEquipo.escudo = createEquipoDto.escudo;

    const equipoCreado = await this.equipoRepository.save(nuevoEquipo);
    return equipoCreado;
  }

  async findAll(): Promise<Equipo[]> {
    return await this.equipoRepository.find();
  }

  async findOne(id: number): Promise<Equipo> {
    const equipo = await this.equipoRepository.findOne({ where: { id } });
    if (!equipo) {
      throw new NotFoundException(`Equipo with ID ${id} not found`);
    }
    return equipo;
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto): Promise<Equipo> {
    const equipo = await this.findOne(id);
    equipo.nombreEquipo = updateEquipoDto.nombre ?? equipo.nombreEquipo;
    equipo.escudo = updateEquipoDto.escudo ?? equipo.escudo;

    const equipoActualizado = await this.equipoRepository.save(equipo);
    return equipoActualizado;
  }

  async remove(id: number): Promise<void> {
    const equipo = await this.findOne(id);
    await this.equipoRepository.remove(equipo);
  }
}
