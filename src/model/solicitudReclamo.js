import { Reclamo } from './reclamo.js';
import { crearError } from './resultado.js';

export const MENSAJES_RECLAMO = {
  SOLICITUD_ENVIADA: 'Solicitud enviada. Un encargado la revisará',
  FALTA_EXPLICACION: 'Es necesario explicar por qué el objeto es tuyo',
  OBJETO_PROPIO: 'No puedes reclamar un objeto que tú registraste',
  SOLICITUD_REPETIDA: 'Ya enviaste una solicitud para este objeto',
};

export class SolicitudReclamo {
  constructor(fechaDeHoy, crearId) {
    this.fechaDeHoy = fechaDeHoy;
    this.crearId = crearId;
  }

  crearReclamo({ objeto, explicacion }, correoDelReclamante, reclamosAnteriores = []) {
    if (objeto.correoDeQuienEncontro === correoDelReclamante) {
      return crearError(MENSAJES_RECLAMO.OBJETO_PROPIO);
    }
    const yaEnvioSolicitud = reclamosAnteriores.some(
      (reclamo) =>
        reclamo.esSobreElObjeto(objeto.id) && reclamo.fueEnviadoPor(correoDelReclamante),
    );
    if (yaEnvioSolicitud) {
      return crearError(MENSAJES_RECLAMO.SOLICITUD_REPETIDA);
    }
    if (explicacion.trim() === '') {
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