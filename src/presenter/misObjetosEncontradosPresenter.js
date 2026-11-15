export const MENSAJES_MIS_OBJETOS_ENCONTRADOS = {
  SIN_OBJETOS: 'Todavía no registraste ningún objeto encontrado',
};

function prepararObjeto(objeto) {
  return { id: objeto.id, foto: objeto.foto, nombre: objeto.nombre, fecha: objeto.fecha };
}

export class MisObjetosEncontradosPresenter {
  constructor(repositorio, sesion) {
    this.repositorio = repositorio;
    this.sesion = sesion;
  }

  obtenerMisObjetos() {
    const usuario = this.sesion.obtenerUsuario();
    const objetos = this.repositorio.obtenerObjetosDe(usuario.correo);
    if (objetos.length === 0) {
      return { objetos: [], mensaje: MENSAJES_MIS_OBJETOS_ENCONTRADOS.SIN_OBJETOS };
    }
    return { objetos: objetos.map(prepararObjeto), mensaje: '' };
  }
}