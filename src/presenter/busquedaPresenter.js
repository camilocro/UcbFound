
import { BuscadorObjetos } from '../model/buscadorObjetos.js';
import { CATEGORIAS, TODAS_LAS_CATEGORIAS } from '../model/categorias.js';

export class BusquedaPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  obtenerCategorias() {
    return [TODAS_LAS_CATEGORIAS, ...CATEGORIAS];
  }

  buscar(texto, categoria = TODAS_LAS_CATEGORIAS) {
    const buscador = new BuscadorObjetos(this.repositorio.obtenerTodos());
    const resultado = buscador.buscar(texto, categoria);

    return {
      ...resultado,
      objetos: resultado.objetos.map((objeto) => objeto.obtenerVistaBasica()),
    };
  }
}
