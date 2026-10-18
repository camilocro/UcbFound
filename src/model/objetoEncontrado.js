export class ObjetoEncontrado {
  constructor({ id, nombre, descripcion, fecha, foto, correoDeQuienEncontro }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.foto = foto;
    this.correoDeQuienEncontro = correoDeQuienEncontro;
  }

  coincideCon(texto) {
    const buscado = texto.toLowerCase();
    return this.nombre.toLowerCase().includes(buscado) || this.descripcion.toLowerCase().includes(buscado);
  }

  vistaBasica() {
    return { ...this };
  }
}