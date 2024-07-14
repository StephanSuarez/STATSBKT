import { Juego } from "src/modulos/juegos/entities/juego.entity";
import { Usuario } from "src/modulos/usuarios/entities/usuario.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreEquipo: string;

    @Column()
    escudo: string;

    @OneToMany(() => Usuario, usuario => usuario.equipo)
    usuarios: Usuario[];

    @OneToMany(() => Juego, juego => juego.equipoUcundinamarca)
    juegosUcundinamarca: Juego[];

    @OneToMany(() => Juego, juego => juego.equipoOtro)
    juegosOtro: Juego[];
}
