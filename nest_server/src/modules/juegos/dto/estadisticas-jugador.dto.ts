export class CreateJuegoDto {
  fecha: Date
  category: string
  dosPuntosE: number
  dosPuntosF: number
  tresPuntosE: number
  tresPuntosF: number
  minutosjug: number[]
  tirolibreE: number
  tirolibreF: number
  rebotes: number
  asistencias: number
  jugadorId: number
  equipo: number
  equipoRival: number
  victoria: boolean
}
