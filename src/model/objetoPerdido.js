
export class ObjetoPerdido {
  constructor(nombre, descripcion, fecha, correoDelDueno) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.correoDelDueno = correoDelDueno;
  }

  faltanNombreOFecha() {
    return this.nombre === '';
  }
}