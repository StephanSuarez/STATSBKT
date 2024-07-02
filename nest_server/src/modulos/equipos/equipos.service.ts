import { Injectable } from '@nestjs/common';
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
  ){}

  async create(createEquipoDto: CreateEquipoDto) {
    const nuevoEquipo = new Equipo()
    nuevoEquipo.nombreEquipo = createEquipoDto.nombre;
    nuevoEquipo.escudo = createEquipoDto.escudo

    const equipoCreado = await this.equipoRepository.save(nuevoEquipo)
    return equipoCreado;
  }

  findAll() {
    return `This action returns all equipos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} equipo`;
  }

  update(id: number, updateEquipoDto: UpdateEquipoDto) {
    return `This action updates a #${id} equipo`;
  }

  remove(id: number) {
    return `This action removes a #${id} equipo`;
  }
}
