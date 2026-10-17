
export class ObjetoPerdido {
  constructor(nombre, descripcion, fecha, correoDelDueno) {
    this.nombre = nombre.trim();
    this.descripcion = descripcion.trim();
    this.fecha = fecha.trim();
    this.correoDelDueno = correoDelDueno;
  }

  faltanNombreOFecha() {
    return this.nombre === '' || this.fecha === '';
  }

  esDeFechaFutura(fechaDeHoy) {
    return this.fecha > fechaDeHoy;
  }
}