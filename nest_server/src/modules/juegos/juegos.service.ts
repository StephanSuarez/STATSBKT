import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createJuegoDto: CreateJuegoDto): Promise<Juego> {
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
    nuevoJuego.equipoPropio = createJuegoDto.equipoAId;
    nuevoJuego.equipoRival = createJuegoDto.equipoBId;
    nuevoJuego.category = createJuegoDto.category;

    const juegoCreado = await this.juegoRepositorio.save(nuevoJuego); 
    return juegoCreado;
  }

  async findAll(): Promise<Juego[]> {
    return await this.juegoRepositorio.find({
      relations: ['jugador', 'equipoPropio', 'equipoRival']
    });
  }

  async findOne(id: number): Promise<Juego> {
    const juego = await this.juegoRepositorio.findOne({ where: { id } });
    if (!juego) {
      throw new NotFoundException(`Juego with ID ${id} not found`);
    }
    return juego;
  }

  async update(id: number, updateJuegoDto: UpdateJuegoDto): Promise<Juego> {
    const juego = await this.findOne(id);
    juego.fecha = updateJuegoDto.fecha ?? juego.fecha;
    juego.dosPuntosE = updateJuegoDto.dosPuntosE ?? juego.dosPuntosE;
    juego.dosPuntosF = updateJuegoDto.dosPuntosF ?? juego.dosPuntosF;
    juego.tresPuntosE = updateJuegoDto.tresPuntosE ?? juego.tresPuntosE;
    juego.tresPuntosF = updateJuegoDto.tresPuntosF ?? juego.tresPuntosF;
    juego.minutosjug = updateJuegoDto.minutosjug ?? juego.minutosjug;
    juego.tirolibreE = updateJuegoDto.tirolibreE ?? juego.tirolibreE;
    juego.tirolibreF = updateJuegoDto.tirolibreF ?? juego.tirolibreF;
    juego.rebotes = updateJuegoDto.rebotes ?? juego.rebotes;
    juego.asistencias = updateJuegoDto.asistencias ?? juego.asistencias;
    juego.jugador = updateJuegoDto.jugadorId ?? juego.jugador;
    juego.equipoPropio = updateJuegoDto.equipoAId ?? juego.equipoPropio;
    juego.equipoRival = updateJuegoDto.equipoBId ?? juego.equipoRival;

    const juegoActualizado = await this.juegoRepositorio.save(juego);
    return juegoActualizado;
  }

  async remove(id: number): Promise<void> {
    const juego = await this.findOne(id);
    await this.juegoRepositorio.remove(juego);
  }

   // STATS PLAYER
   async getStatsPlayer(id: number) {
    const mathcesPlayer = await this.juegoRepositorio.find({
      where: { jugador: {id} },
      relations: ["jugador", "equipoRival"]
    });
    return mathcesPlayer
  }
}
