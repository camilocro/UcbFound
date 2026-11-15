export const MENSAJES_MIS_OBJETOS_ENCONTRADOS = {
  SIN_OBJETOS: 'Todavía no registraste ningún objeto encontrado',
};

export class MisObjetosEncontradosPresenter {
  constructor(repositorio, sesion) {
    this.repositorio = repositorio;
    this.sesion = sesion;
  }

  obtenerMisObjetos() {
    return { objetos: [], mensaje: MENSAJES_MIS_OBJETOS_ENCONTRADOS.SIN_OBJETOS };
  }
}