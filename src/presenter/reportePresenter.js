import { ReporteObjetoPerdido } from '../model/reporteObjetoPerdido.js';
import { convertirFechaATexto } from '../model/fecha.js';

export class ReportePresenter {
  constructor(repositorio, sesion, obtenerFechaActual = () => new Date()) {
    this.repositorio = repositorio;
    this.sesion = sesion;
    this.obtenerFechaActual = obtenerFechaActual;
  }

  reportarObjeto(datos) {
    const usuario = this.sesion.obtenerUsuario();
    const reglasDeReporte = new ReporteObjetoPerdido(
      convertirFechaATexto(this.obtenerFechaActual()),
    );
    const resultado = reglasDeReporte.reportar(datos, usuario.correo);
    if (resultado.exito) {
      this.repositorio.guardar(resultado.objeto);
    }
    return resultado;
  }
}