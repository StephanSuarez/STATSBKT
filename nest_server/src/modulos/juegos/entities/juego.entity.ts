import { Equipo } from 'src/modulos/equipos/entities/equipo.entity';
import { Usuario } from 'src/modulos/usuarios/entities/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Juego {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp' })
    fecha: Date;

    @Column({ type: 'float' })
    dosPuntosE: number;

    @Column({ type: 'float' })
    dosPuntosF: number;

    @Column({ type: 'float' })
    tresPuntosE: number;

    @Column({ type: 'float' })
    tresPuntosF: number;

    @Column({ type: 'simple-array', nullable: true })
    minutosjug: number[];

    @Column({ type: 'float', default: 0 })
    tirolibreE: number;

    @Column({ type: 'float', default: 0 })
    tirolibreF: number;

    @Column({ type: 'int' })
    rebotes: number;

    @Column({ type: 'int' })
    asistencias: number;

    @ManyToOne(() => Usuario, usuario => usuario.juegos)
    jugador: Usuario;

    @ManyToOne(() => Equipo, equipo => equipo.juegosUcundinamarca)
    equipoUcundinamarca: Equipo;

    @ManyToOne(() => Equipo, equipo => equipo.juegosOtro)
    equipoOtro: Equipo;
}

