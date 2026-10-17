import { ObjetoPerdido } from './objetoPerdido.js';

export const MENSAJES_REPORTE = {
  REPORTE_CREADO: 'Reporte creado correctamente',
};

// Aplica las reglas de la HU-04 para reportar un objeto perdido
export class ReporteObjetoPerdido {
  constructor(fechaDeHoy) {
    this.fechaDeHoy = fechaDeHoy;
  }

  reportar({ nombre, descripcion, fecha }, correoDelDueno) {
    const objeto = new ObjetoPerdido(nombre, descripcion, fecha, correoDelDueno);
    return { exito: true, mensaje: MENSAJES_REPORTE.REPORTE_CREADO, objeto };
  }
}