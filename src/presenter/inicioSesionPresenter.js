import { InicioSesion } from '../model/inicioSesion.js';

// Conecta la vista del login con el modelo
export class InicioSesionPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  procesarInicioSesion(datos) {
    const inicioSesion = new InicioSesion(this.repositorio.obtenerUsuarios());
    return inicioSesion.iniciar(datos);
  }
}