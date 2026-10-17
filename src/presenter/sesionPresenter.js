
export class SesionPresenter {
  constructor(sesion) {
    this.sesion = sesion;
  }

  cerrarSesion() {
    this.sesion.cerrar();
    return 'inicio-sesion';
  }
}