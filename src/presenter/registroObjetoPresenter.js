import { RegistroObjetoEncontrado } from '../model/registroObjetoEncontrado.js';
import { fechaComoTexto } from '../model/fecha.js';

export class RegistroObjetoPresenter {
  constructor(repositorio, sesion, obtenerFechaActual = () => new Date(), crearId = () => `obj-${Date.now()}`) {
    this.repositorio = repositorio;
    this.sesion = sesion;
    this.obtenerFechaActual = obtenerFechaActual;
    this.crearId = crearId;
  }

  registrar(datos) {
    const usuario = this.sesion.obtenerUsuario();
    const registro = new RegistroObjetoEncontrado(fechaComoTexto(this.obtenerFechaActual()), this.crearId);
    const resultado = registro.registrar(datos, usuario.correo);
    if (resultado.exito) {
      this.repositorio.guardar(resultado.objeto);
    }
    return resultado;
  }
}