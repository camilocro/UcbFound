export class ListaObjetosGuardados {
  constructor(objetos) {
    this.objetos = objetos;
  }

  obtener() {
    const objetosGuardados = [...this.objetos]
      .reverse()
      .sort((primero, segundo) => segundo.fecha.localeCompare(primero.fecha));
    return { objetos: objetosGuardados, mensaje: '' };
  }
}