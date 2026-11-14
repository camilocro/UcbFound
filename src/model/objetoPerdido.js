export class ObjetoPerdido {
  constructor({ nombre, descripcion, fecha, correoDelDueno, bloque = '', aula = '', celular }) {
    this.nombre = nombre.trim();
    this.descripcion = descripcion.trim();
    this.fecha = fecha.trim();
    this.correoDelDueno = correoDelDueno;
    this.bloque = bloque;
    this.aula = aula.trim();
    this.celular = celular;
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