import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { Juego } from './entities/juego.entity';
import { Not, Repository } from 'typeorm';
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
  async getStatsPlayer(id: number, categoria: string) {
    let mathcesPlayer: any;
    if(categoria == ""){
      mathcesPlayer = await this.juegoRepositorio.find({
        where: { jugador: {id} },
        relations: ["jugador", "equipoRival"]
      })
    }
    else{
      mathcesPlayer = await this.juegoRepositorio.find({
        where: { jugador: {id}, category: categoria },
        relations: ["jugador", "equipoRival"]
      });
    }
    return mathcesPlayer
  }

  // JUGADORES CON MAS REBOTES
  async getTopRebotes() {
    try {
      const juegos = await this.juegoRepositorio.find({
        where: { rebotes: Not(0) },
        relations: ["jugador", "equipoPropio", "equipoRival"]
      });

      const jugadoresMasRebotes = juegos.sort((a, b) => b.rebotes - a.rebotes).slice(0, 3);

      return jugadoresMasRebotes;
    } catch (error) {
      throw new Error(`Error al obtener los jugadores con más rebotes: ${error.message}`);
    }
  }


  // JUGADORES CON MAS ASISTENCIAS
  async getTopAsistencias() {
    try {
      const juegos = await this.juegoRepositorio.find({
        where: { asistencias: Not(0) },
        relations: ["jugador", "equipoPropio", "equipoRival"]
      });

      const jugadoresMasAsistencias = juegos.sort((a, b) => b.asistencias - a.asistencias).slice(0, 3);

      return jugadoresMasAsistencias;
    } catch (error) {
      throw new Error(`Error al obtener los jugadores con más asistencias: ${error.message}`);
    }
  }


  // JUGADORES CON MAS PUNTOS
  async getTopPuntos() {
    try {
      // Obtenemos todos los juegos y las relaciones necesarias
      const juegos = await this.juegoRepositorio.find({
        relations: ["jugador"] // Asegúrate de que el nombre de la relación esté correcto
      });

      // Calculamos los puntos totales para cada juego
      const jugadoresPuntos = juegos.map((juego) => {
        let totalPuntos = 0;
        totalPuntos += juego.dosPuntosE * 2;
        totalPuntos += juego.tresPuntosE * 3;
        totalPuntos += juego.tirolibreE;
        return {
          ...juego,
          totalPuntos
        };
      });

      // Ordenamos los juegos por los puntos totales en orden descendente y tomamos los 3 primeros
      const jugadoresMasPuntos = jugadoresPuntos.sort((a, b) => b.totalPuntos - a.totalPuntos).slice(0, 3);

      return jugadoresMasPuntos;
    } catch (err) {
      throw new Error(`Error al obtener jugadores con más puntos: ${err.message}`);
    }
  }


}
