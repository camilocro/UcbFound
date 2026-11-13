import { ObjetoPerdido } from './objetoPerdido.js';
import { crearError } from './resultado.js';

export const MENSAJES_REPORTE = {
  REPORTE_CREADO: 'Reporte creado correctamente',
  NOMBRE_O_FECHA_VACIOS: 'Es necesario ingresar nombre y fecha',
  FECHA_FUTURA: 'La fecha no puede ser futura',
};

export class ReporteObjetoPerdido {
  constructor(fechaDeHoy) {
    this.fechaDeHoy = fechaDeHoy;
  }

  reportar({ nombre, descripcion, fecha }, correoDelDueno) {
    const objeto = new ObjetoPerdido({ nombre, descripcion, fecha, correoDelDueno });
    if (objeto.tieneNombreOFechaVacios()) {
      return crearError(MENSAJES_REPORTE.NOMBRE_O_FECHA_VACIOS);
    }
    if (objeto.tieneFechaFutura(this.fechaDeHoy)) {
      return crearError(MENSAJES_REPORTE.FECHA_FUTURA);
    }
    return { exito: true, mensaje: MENSAJES_REPORTE.REPORTE_CREADO, objeto };
  }
}