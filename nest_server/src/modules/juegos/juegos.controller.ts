import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';

@Controller('juegos')
export class JuegosController {
  constructor(private readonly juegosService: JuegosService) {}

  @Post()
  create(@Body() createJuegoDto: CreateJuegoDto) {
    return this.juegosService.create(createJuegoDto);
  }

  @Get()
  findAll() {
    return this.juegosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juegosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJuegoDto: UpdateJuegoDto) {
    return this.juegosService.update(+id, updateJuegoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juegosService.remove(+id);
  }
  
  // STATS PLAYER
  @Get('estadisticas/:id')
  getStats(
    @Param('id') id: string,
    @Query('categoria') categoria: string = ""
  ) {
    return this.juegosService.getStatsPlayer(+id, categoria);
  }
  
  // MAS REBOTES
  @Get('stats/rebotes')
  getTopRebotes(){
    return this.juegosService.getTopRebotes()
  }
  
  // MAS ASISTENCIAS
  @Get('stats/asistencias')
  getTopAsistencias(){
    return this.juegosService.getTopAsistencias()
  }

  // MAS PUNTOS
  @Get('stats/puntos')
  getTopPuntos(){
   return this.juegosService.getTopPuntos()
  }


}