import { ReporteObjetoPerdido } from '../model/reporteObjetoPerdido.js';
import { fechaComoTexto } from '../model/fecha.js';

export class ReportePresenter {
  constructor(repositorio, sesion, obtenerFechaActual = () => new Date()) {
    this.repositorio = repositorio;
    this.sesion = sesion;
    this.obtenerFechaActual = obtenerFechaActual;
  }

  reportarObjeto(datos) {
    const usuario = this.sesion.obtenerUsuario();
    const reporte = new ReporteObjetoPerdido(fechaComoTexto(this.obtenerFechaActual()));
    const resultado = reporte.reportar(datos, usuario.correo);
    if (resultado.exito) {
      this.repositorio.guardar(resultado.objeto);
    }
    return resultado;
  }
}