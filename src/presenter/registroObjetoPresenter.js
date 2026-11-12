import { MENSAJES_REGISTRO_OBJETO, RegistroObjetoEncontrado } from '../model/registroObjetoEncontrado.js';
import { convertirFechaATexto } from '../model/fecha.js';
import { crearError } from '../model/resultado.js';

const MENSAJE_SESION_REQUERIDA = 'Inicia sesión para registrar un objeto';

let cantidadDeIdsCreados = 0;

function crearIdUnico() {
  cantidadDeIdsCreados += 1;
  return `obj-${Date.now()}-${cantidadDeIdsCreados}`;
}

export class RegistroObjetoPresenter {
  constructor(
    repositorio,
    sesion,
    obtenerFechaActual = () => new Date(),
    crearId = crearIdUnico,
  ) {
    this.repositorio = repositorio;
    this.sesion = sesion;
    this.obtenerFechaActual = obtenerFechaActual;
    this.crearId = crearId;
  }

  registrar(datos) {
    const usuario = this.sesion.obtenerUsuario();
    if (!usuario) {
      return crearError(MENSAJE_SESION_REQUERIDA);
    }
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