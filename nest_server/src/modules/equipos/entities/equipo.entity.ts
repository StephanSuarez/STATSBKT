import { Juego } from "src/modules/juegos/entities/juego.entity";
import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
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

    @OneToMany(() => Juego, juego => juego.equipoPropio)
    equipoPropio: Juego[];

    @OneToMany(() => Juego, juego => juego.equipoRival)
    equipoRival: Juego[];
}
