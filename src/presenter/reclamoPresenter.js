import { SolicitudReclamo } from '../model/solicitudReclamo.js';
import { convertirFechaATexto } from '../model/fecha.js';

export class ReclamoPresenter {
  constructor(
    repositorioReclamos,
    repositorioObjetosEncontrados,
    sesion,
    obtenerFechaActual = () => new Date(),
    crearId = () => `reclamo-${Date.now()}`,
  ) {
    this.repositorioReclamos = repositorioReclamos;
    this.repositorioObjetosEncontrados = repositorioObjetosEncontrados;
    this.sesion = sesion;
    this.obtenerFechaActual = obtenerFechaActual;
    this.crearId = crearId;
  }

  enviarReclamo(idObjeto, explicacion) {
    const usuario = this.sesion.obtenerUsuario();
    const objeto = this.repositorioObjetosEncontrados.buscarPorId(idObjeto);
    const reglasDeReclamo = new SolicitudReclamo(
      convertirFechaATexto(this.obtenerFechaActual()),
      this.crearId,
    );
    const resultado = reglasDeReclamo.crearReclamo(
      { objeto, explicacion },
      usuario.correo,
    );
    if (resultado.exito) {
      this.repositorioReclamos.guardar(resultado.reclamo);
    }
    return resultado;
  }
}