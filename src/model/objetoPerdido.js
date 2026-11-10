export class ObjetoPerdido {
  constructor(nombre, descripcion, fecha, correoDelDueno) {
    this.nombre = nombre.trim();
    this.descripcion = descripcion.trim();
    this.fecha = fecha.trim();
    this.correoDelDueno = correoDelDueno;
  }

  tieneNombreOFechaVacios() {
    return this.nombre === '' || this.fecha === '';
  }

  tieneFechaFutura(fechaDeHoy) {
    return this.fecha > fechaDeHoy;
  }
}