import { ObjetoPerdido } from './objetoPerdido.js';
import { crearError } from './resultado.js';

export const MENSAJES_REPORTE = {
  REPORTE_CREADO: 'Reporte creado correctamente',
  NOMBRE_O_FECHA_VACIOS: 'Es necesario ingresar nombre y fecha',
  FECHA_FUTURA: 'La fecha no puede ser futura',
  FALTA_BLOQUE: 'Es necesario indicar el bloque donde lo perdiste',
  CELULAR_INVALIDO: 'Ingrese un número de celular válido',
};

export class ReporteObjetoPerdido {
  constructor(fechaDeHoy) {
    this.fechaDeHoy = fechaDeHoy;
  }

  reportar({ nombre, descripcion, fecha, bloque, aula, celular }, correoDelDueno) {
    const objeto = new ObjetoPerdido({
      nombre,
      descripcion,
      fecha,
      correoDelDueno,
      bloque,
      aula,
      celular,
    });
    if (objeto.tieneNombreOFechaVacios()) {
      return crearError(MENSAJES_REPORTE.NOMBRE_O_FECHA_VACIOS);
    }
    if (objeto.tieneFechaFutura(this.fechaDeHoy)) {
      return crearError(MENSAJES_REPORTE.FECHA_FUTURA);
    }
    if (objeto.tieneBloqueVacio()) {
      return crearError(MENSAJES_REPORTE.FALTA_BLOQUE);
    }
    if (objeto.tieneCelularInvalido()) {
      return crearError(MENSAJES_REPORTE.CELULAR_INVALIDO);
    }
    return { exito: true, mensaje: MENSAJES_REPORTE.REPORTE_CREADO, objeto };
  }
}