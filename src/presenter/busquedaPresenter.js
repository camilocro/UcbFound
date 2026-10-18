import { BuscadorObjetos } from '../model/buscadorObjetos.js';

export class BusquedaPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  buscar(texto) {
    const buscador = new BuscadorObjetos(this.repositorio.obtenerTodos());
    const resultado = buscador.buscar(texto);
    return { ...resultado, objetos: resultado.objetos.map((objeto) => objeto.vistaBasica()) };
  }
}