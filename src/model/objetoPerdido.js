import { esCelularOpcionalValido } from './celular.js';
import { CATEGORIAS } from './categorias.js';

export const ESTADO_INICIAL_REPORTE = 'Buscando';

export class ObjetoPerdido {
  constructor({
    nombre,
    descripcion,
    fecha,
    correoDelDueno,
    categoria = '',
    bloque = '',
    aula = '',
    celular,
  }) {
    this.nombre = nombre.trim();
    this.descripcion = descripcion.trim();
    this.fecha = fecha.trim();
    this.correoDelDueno = correoDelDueno;
    this.categoria = categoria;
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

  tieneCategoriaInvalida() {
    return !CATEGORIAS.includes(this.categoria);
  }

  tieneBloqueInvalido() {
    return this.bloque === '';
  }

  tieneCelularInvalido() {
    return !esCelularOpcionalValido(this.celular);
  }
}