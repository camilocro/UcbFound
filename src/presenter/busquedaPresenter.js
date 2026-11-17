
import { BuscadorObjetos } from '../model/buscadorObjetos.js';
import { CATEGORIAS, TODAS_LAS_CATEGORIAS } from '../model/categorias.js';
import { BLOQUES, TODOS_LOS_LUGARES } from '../model/bloques.js';

export class BusquedaPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  obtenerCategorias() {
    return [TODAS_LAS_CATEGORIAS, ...CATEGORIAS];
  }

    obtenerLugares() {
    return [TODOS_LOS_LUGARES, ...BLOQUES];
  }

   buscar(texto, categoria = TODAS_LAS_CATEGORIAS, lugar = TODOS_LOS_LUGARES) {
    const buscador = new BuscadorObjetos(this.repositorio.obtenerTodos());
       const resultado = buscador.buscar(texto, categoria, lugar);

    return {
      ...resultado,
      objetos: resultado.objetos.map((objeto) => objeto.obtenerVistaBasica()),
    };
  }
}
