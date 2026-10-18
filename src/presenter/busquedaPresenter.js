import { BuscadorObjetos } from '../model/buscadorObjetos.js';

export class BusquedaPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  buscar(texto) {
    const buscador = new BuscadorObjetos(this.repositorio.obtenerTodos());
    return buscador.buscar(texto);
  }
}