import { MENSAJES_REGISTRO_OBJETO, RegistroObjetoEncontrado } from '../model/registroObjetoEncontrado.js';
import { convertirFechaATexto } from '../model/fecha.js';
import { CATEGORIAS } from '../model/categorias.js';

export class RegistroObjetoPresenter {
  constructor(
    repositorio,
    sesion,
    obtenerFechaActual = () => new Date(),
    crearId = () => `obj-${Date.now()}`,
  ) {
    this.repositorio = repositorio;
    this.sesion = sesion;
    this.obtenerFechaActual = obtenerFechaActual;
    this.crearId = crearId;
  }

  obtenerCategorias() {
    return CATEGORIAS;
  }

  registrar(datos) {
    const usuario = this.sesion.obtenerUsuario();
    const reglasDeRegistro = new RegistroObjetoEncontrado(
      convertirFechaATexto(this.obtenerFechaActual()),
      this.crearId,
    );
    const resultado = reglasDeRegistro.registrar(datos, usuario.correo);
    if (!resultado.exito) {
      return resultado;
    }
    try {
      this.repositorio.guardar(resultado.objeto);
    } catch {
      return { exito: false, mensaje: MENSAJES_REGISTRO_OBJETO.FOTO_MUY_PESADA };
    }
    return resultado;
  }
}