import { ObjetoPerdido } from './objetoPerdido.js';

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
    const objeto = new ObjetoPerdido(nombre, descripcion, fecha, correoDelDueno);
    if (objeto.faltanNombreOFecha()) {
      return this.crearError(MENSAJES_REPORTE.NOMBRE_O_FECHA_VACIOS);
    }
    if (objeto.esDeFechaFutura(this.fechaDeHoy)) {
      return this.crearError(MENSAJES_REPORTE.FECHA_FUTURA);
    }
    return { exito: true, mensaje: MENSAJES_REPORTE.REPORTE_CREADO, objeto };
  }

  crearError(mensaje) {
    return { exito: false, mensaje };
  }
}