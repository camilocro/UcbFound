import { ordenarDelMasRecienteAlMasAntiguo } from './orden.js';

export const MENSAJES_OBJETOS_GUARDADOS = {
    SIN_OBJETOS: 'No hay objetos guardados',
};

export class ListaObjetosGuardados {
  constructor(objetos) {
    this.objetos = objetos;
  }

  obtener() {
        const objetosGuardados = ordenarDelMasRecienteAlMasAntiguo(this.objetos);
    if (objetosGuardados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_OBJETOS_GUARDADOS.SIN_OBJETOS };
    }
    return { objetos: objetosGuardados, mensaje: '' };
  }
}