import { TODAS_LAS_CATEGORIAS } from './categorias.js';
function quitarTildes(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

const SIN_CATEGORIA = 'Sin categoría';
const SIN_LUGAR = 'Lugar no indicado';

export class ObjetoEncontrado {
  constructor({ id, nombre, descripcion, fecha, foto, correoDeQuienEncontro, categoria, bloque, aula }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha = fecha;
    this.foto = foto;
    this.correoDeQuienEncontro = correoDeQuienEncontro;
    this.categoria = categoria;
    this.bloque = bloque;
    this.aula = aula;
  }

  coincideCon(texto) {
    const textoBuscado = quitarTildes(texto);
    return quitarTildes(this.nombre).includes(textoBuscado) || quitarTildes(this.descripcion).includes(textoBuscado);
  }
  esDeCategoria(categoria) {
    return categoria === TODAS_LAS_CATEGORIAS || this.categoria === categoria;
  }

  obtenerDetalle() {
    return { ...this.obtenerVistaBasica(), categoria: this.categoria || SIN_CATEGORIA, lugar: this.obtenerLugar() };
  }

  obtenerLugar() {
    if (this.bloque && this.aula) {
      return `${this.bloque}, ${this.aula}`;
    }
    if (this.bloque) {
      return this.bloque;
    }
    return SIN_LUGAR;
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