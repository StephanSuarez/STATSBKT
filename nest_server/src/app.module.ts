import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';
import { JuegosModule } from './modulos/juegos/juegos.module';
import { EquiposModule } from './modulos/equipos/equipos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './modulos/usuarios/entities/usuario.entity';
import { Equipo } from './modulos/equipos/entities/equipo.entity';
import { Juego } from './modulos/juegos/entities/juego.entity';

@Module({
  imports: [UsuariosModule, JuegosModule, EquiposModule, TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'statsbkt',
      entities: [Usuario, Equipo, Juego],
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
