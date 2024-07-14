import { Equipo } from "src/modulos/equipos/entities/equipo.entity";
import { Juego } from "src/modulos/juegos/entities/juego.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Usuario {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreUsuario: string;

    @Column()
    password: string;
    
    @ManyToOne(() => Equipo, (equipo) => equipo.usuarios)
    equipo: Equipo;

    @Column()
    equipoId: number;

    @OneToMany(() => Juego, juego => juego.jugador)
    juegos: Juego[];
}
