import { ordenarDelMasRecienteAlMasAntiguo } from './orden.js';

export const MENSAJES_OBJETOS_GUARDADOS = {
  SIN_OBJETOS: 'No hay objetos guardados por ahora',
};

export class ListaObjetosGuardados {
  constructor(objetos) {
    this.objetos = objetos;
  }

  obtener() {
    const objetosGuardados = ordenarDelMasRecienteAlMasAntiguo(
      this.objetos.filter((objeto) => !objeto.fueRecogido())
    );
    if (objetosGuardados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_OBJETOS_GUARDADOS.SIN_OBJETOS };
    }
    return { objetos: objetosGuardados, mensaje: '' };
  }
}