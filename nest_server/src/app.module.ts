import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { JuegosModule } from './modules/juegos/juegos.module';
import { EquiposModule } from './modules/equipos/equipos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './modules/usuarios/entities/usuario.entity';
import { Equipo } from './modules/equipos/entities/equipo.entity';
import { Juego } from './modules/juegos/entities/juego.entity';
import { AdminsModule } from './modules/admins/admins.module';
import { Admin } from './modules/admins/entities/admin.entity';

@Module({
  imports: [UsuariosModule, JuegosModule, EquiposModule, TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'statsbkt',
      entities: [Usuario, Equipo, Juego, Admin],
      synchronize: true,
  }), AdminsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
