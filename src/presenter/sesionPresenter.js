import { obtenerOpcionesDeNavegacion } from '../model/navegacion.js';
export class SesionPresenter {
  constructor(sesion) {
    this.sesion = sesion;
  }

  cerrarSesion() {
    this.sesion.cerrar();
    return 'inicio-sesion';
  }

  iniciarSesion(usuario) {
    this.sesion.iniciar(usuario);
    return 'principal';
  }

  obtenerUsuario() {
    return this.sesion.obtenerUsuario();
  }

    esEncargado() {
    return this.sesion.esEncargado();
  }
  
    resolverPagina(pagina) {
    return this.sesion.resolverPagina(pagina);
  }

  obtenerOpcionesDeNavegacion(paginaActual) {
    if (!this.sesion.estaIniciada()) {
      return [];
    }
     return obtenerOpcionesDeNavegacion(this.sesion.esEncargado(), paginaActual);
  }
}