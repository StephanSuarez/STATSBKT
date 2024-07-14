import { Injectable } from '@nestjs/common';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { Juego } from './entities/juego.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JuegosService {
  constructor(
    @InjectRepository(Juego)
    private juegoRepositorio: Repository<Juego>
  ){}

  async create(createJuegoDto: CreateJuegoDto) {
    const nuevoJuego = new Juego();
    nuevoJuego.fecha = createJuegoDto.fecha;
    nuevoJuego.dosPuntosE = createJuegoDto.dosPuntosE;
    nuevoJuego.dosPuntosF = createJuegoDto.dosPuntosF;
    nuevoJuego.tresPuntosE = createJuegoDto.tresPuntosE;
    nuevoJuego.tresPuntosF = createJuegoDto.tresPuntosF;
    nuevoJuego.minutosjug = createJuegoDto.minutosjug;
    nuevoJuego.tirolibreE = createJuegoDto.tirolibreE;
    nuevoJuego.tirolibreF = createJuegoDto.tirolibreF;
    nuevoJuego.rebotes = createJuegoDto.rebotes;
    nuevoJuego.asistencias = createJuegoDto.asistencias;
    nuevoJuego.jugador = createJuegoDto.jugadorId;
    nuevoJuego.equipoUcundinamarca = createJuegoDto.equipoUcundinamarcaId;
    nuevoJuego.equipoOtro = createJuegoDto.equipoOtroId;

    const juegoCreado = await this.juegoRepositorio.save(nuevoJuego); 
    return juegoCreado
  }

  findAll() {
    return `This action returns all juegos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} juego`;
  }

  update(id: number, updateJuegoDto: UpdateJuegoDto) {
    return `This action updates a #${id} juego`;
  }

  remove(id: number) {
    return `This action removes a #${id} juego`;
  }
}
