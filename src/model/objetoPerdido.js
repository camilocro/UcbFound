export class ObjetoPerdido {
  constructor({ nombre, descripcion, fecha, correoDelDueno, bloque = '', aula }) {
    this.nombre = nombre.trim();
    this.descripcion = descripcion.trim();
    this.fecha = fecha.trim();
    this.correoDelDueno = correoDelDueno;
    this.bloque = bloque;
    this.aula = aula;
  }

  tieneNombreOFechaVacios() {
    return this.nombre === '' || this.fecha === '';
  }

  tieneFechaFutura(fechaDeHoy) {
    return this.fecha > fechaDeHoy;
  }

  tieneBloqueVacio() {
    return this.bloque === '';
  }
}