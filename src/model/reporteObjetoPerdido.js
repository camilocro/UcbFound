export const MENSAJES_REPORTE = {
  REPORTE_CREADO: 'Reporte creado correctamente',
};

export class ReporteObjetoPerdido {
  constructor(fechaDeHoy) {
    this.fechaDeHoy = fechaDeHoy;
  }

  reportar() {
    return { exito: true, mensaje: MENSAJES_REPORTE.REPORTE_CREADO };
  }
}