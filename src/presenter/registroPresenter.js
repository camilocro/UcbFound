import { RegistroUsuario } from '../model/registro.js';
import { RepositorioUsuarios } from '../model/repositorioUsuarios.js';

// Conecta la vista del registro con el modelo
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

export const registroPresenter = new RegistroPresenter(new RepositorioUsuarios(window.localStorage));