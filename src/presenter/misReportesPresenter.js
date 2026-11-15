export class MisReportesPresenter {
  constructor(repositorio, sesion) {
    this.repositorio = repositorio;
    this.sesion = sesion;
  }

  obtenerMisReportes() {
    const usuario = this.sesion.obtenerUsuario();
    const reportes = this.repositorio
      .obtenerReportesDe(usuario.correo)
      .reverse()
      .sort((primero, segundo) => segundo.fecha.localeCompare(primero.fecha));
    return { reportes, mensaje: '' };
  }
}