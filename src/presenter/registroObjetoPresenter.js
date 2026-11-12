import { MENSAJES_REGISTRO_OBJETO, RegistroObjetoEncontrado } from '../model/registroObjetoEncontrado.js';
import { convertirFechaATexto } from '../model/fecha.js';
import { CATEGORIAS } from '../model/categorias.js';
import { BLOQUES } from '../model/bloques.js';
import { crearError } from '../model/resultado.js';

const MENSAJE_SESION_REQUERIDA = 'Inicia sesión para registrar un objeto';
const NOMBRE_ERROR_ALMACENAMIENTO_LLENO = 'QuotaExceededError';

let cantidadDeIdsCreados = 0;

function crearIdUnico() {
  cantidadDeIdsCreados += 1;
  return `obj-${Date.now()}-${cantidadDeIdsCreados}`;
}

function mensajeDeErrorAlGuardar(error) {
  return error.name === NOMBRE_ERROR_ALMACENAMIENTO_LLENO
    ? MENSAJES_REGISTRO_OBJETO.FOTO_MUY_PESADA
    : MENSAJES_REGISTRO_OBJETO.NO_SE_PUDO_GUARDAR;
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

  obtenerCategorias() {
    return CATEGORIAS;
  }

  obtenerBloques() {
    return BLOQUES;
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
    } catch (error) {
      return crearError(mensajeDeErrorAlGuardar(error));
    }
    return resultado;
  }
}