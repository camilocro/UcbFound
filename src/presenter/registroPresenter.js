import { RegistroUsuario } from '../model/registro.js';

export class RegistroPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  procesarRegistro(datos) {
    const registro = new RegistroUsuario(this.repositorio.obtenerCorreos());
    const resultado = registro.registrar(datos);
    if (resultado.exito) {
      this.repositorio.guardar(resultado.usuario);
    }
    return resultado;
  }
}