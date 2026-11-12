function quitarTildes(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

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
    const textoBuscado = quitarTildes(texto);
    return quitarTildes(this.nombre).includes(textoBuscado) || quitarTildes(this.descripcion).includes(textoBuscado);
  }

  obtenerVistaBasica() {
    return {
      id: this.id,
      foto: this.foto,
      nombre: this.nombre,
      descripcion: this.descripcion,
      fecha: this.fecha,
    };
  }
}