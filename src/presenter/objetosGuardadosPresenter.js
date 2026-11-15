import { ListaObjetosGuardados } from '../model/listaObjetosGuardados.js';

export class ObjetosGuardadosPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  obtenerObjetosGuardados() {
    const resultado = new ListaObjetosGuardados(this.repositorio.obtenerTodos()).obtener();
    return {
      ...resultado,
      objetos: resultado.objetos.map((objeto) => objeto.obtenerVistaEncargado()),
    };
  }
}