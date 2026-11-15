export const MENSAJES_OBJETOS_GUARDADOS = {
  SIN_OBJETOS: 'No hay objetos guardados por ahora',
};

export class ListaObjetosGuardados {
  constructor(objetos) {
    this.objetos = objetos;
  }

  obtener() {
    const objetosGuardados = [...this.objetos]
      .reverse()
      .sort((primero, segundo) => segundo.fecha.localeCompare(primero.fecha));
    if (objetosGuardados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_OBJETOS_GUARDADOS.SIN_OBJETOS };
    }
    return { objetos: objetosGuardados, mensaje: '' };
  }
}