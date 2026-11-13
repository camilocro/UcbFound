import { Reclamo } from './reclamo.js';

export const MENSAJES_RECLAMO = {
  SOLICITUD_ENVIADA: 'Solicitud enviada. Un encargado la revisará',
};

export class SolicitudReclamo {
  constructor(fechaDeHoy, crearId) {
    this.fechaDeHoy = fechaDeHoy;
    this.crearId = crearId;
  }

  crearReclamo({ objeto, explicacion }, correoDelReclamante) {
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