import { describirLugar } from '../model/lugar.js';
import { ESTADO_INICIAL_REPORTE } from '../model/objetoPerdido.js';
import { ordenarDelMasRecienteAlMasAntiguo } from '../model/orden.js';

export const MENSAJES_MIS_REPORTES = {
  SIN_REPORTES: 'Todavía no reportaste ningún objeto perdido',
};

function prepararReporte(reporte) {
  return { ...reporte, lugar: describirLugar(reporte.bloque, reporte.aula), estado: ESTADO_INICIAL_REPORTE };
}

export class MisReportesPresenter {
  constructor(repositorio, sesion) {
    this.repositorio = repositorio;
    this.sesion = sesion;
  }

  obtenerMisReportes() {
    const usuario = this.sesion.obtenerUsuario();
    const reportes = ordenarDelMasRecienteAlMasAntiguo(this.repositorio.obtenerReportesDe(usuario.correo));
    if (reportes.length === 0) {
      return { reportes: [], mensaje: MENSAJES_MIS_REPORTES.SIN_REPORTES };
    }
    return { reportes: reportes.map(prepararReporte), mensaje: '' };
  }
}