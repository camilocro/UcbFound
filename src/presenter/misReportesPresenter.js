import { describirLugar } from '../model/lugar.js';

export const MENSAJES_MIS_REPORTES = {
  SIN_REPORTES: 'Todavía no reportaste ningún objeto perdido',
};

function agregarLugar(reporte) {
  return { ...reporte, lugar: describirLugar(reporte.bloque, reporte.aula) };
}

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
    if (reportes.length === 0) {
      return { reportes: [], mensaje: MENSAJES_MIS_REPORTES.SIN_REPORTES };
    }
    return { reportes: reportes.map(agregarLugar), mensaje: '' };
  }
}