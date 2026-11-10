import { RegistroUsuario } from '../model/registro.js';

export class RegistroPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  procesarRegistro(datos) {
    const reglasDeRegistro = new RegistroUsuario(this.repositorio.obtenerCorreos());
    const resultado = reglasDeRegistro.registrar(datos);
    if (resultado.exito) {
      this.repositorio.guardar(resultado.usuario);
    }
    return resultado;
  }
}