import { Reclamo } from './reclamo.js';
import { crearError } from './resultado.js';

export const MENSAJES_RECLAMO = {
  SOLICITUD_ENVIADA: 'Solicitud enviada. Un encargado la revisará',
  FALTA_EXPLICACION: 'Es necesario explicar por qué el objeto es tuyo',
};

export class SolicitudReclamo {
  constructor(fechaDeHoy, crearId) {
    this.fechaDeHoy = fechaDeHoy;
    this.crearId = crearId;
  }

  crearReclamo({ objeto, explicacion }, correoDelReclamante) {
    if (explicacion === '') {
      return crearError(MENSAJES_RECLAMO.FALTA_EXPLICACION);
    }
    const reclamo = new Reclamo({
      id: this.crearId(),
      idObjeto: objeto.id,
      correoDelReclamante,
      explicacion: explicacion.trim(),
      fecha: this.fechaDeHoy,
    });
    return { exito: true, mensaje: MENSAJES_RECLAMO.SOLICITUD_ENVIADA, reclamo };
  }
}