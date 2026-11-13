export const ESTADO_PENDIENTE = 'pendiente';

export class Reclamo {
  constructor({
    id,
    idObjeto,
    correoDelReclamante,
    explicacion,
    fecha,
    estado = ESTADO_PENDIENTE,
  }) {
    this.id = id;
    this.idObjeto = idObjeto;
    this.correoDelReclamante = correoDelReclamante;
    this.explicacion = explicacion;
    this.fecha = fecha;
    this.estado = estado;
  }
  esSobreElObjeto(idObjeto) {
    return this.idObjeto === idObjeto;
  }

  fueEnviadoPor(correo) {
    return this.correoDelReclamante === correo;
  }
}