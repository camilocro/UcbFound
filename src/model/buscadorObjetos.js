export const MENSAJES_BUSQUEDA = {
  SIN_RESULTADOS: 'No se encontraron objetos con ese nombre o descripción',
};

export class BuscadorObjetos {
  constructor(objetos) {
    this.objetos = objetos;
  }

  buscar(texto) {
    const buscado = texto.trim();
    const encontrados = this.objetos
      .filter((objeto) => objeto.coincideCon(buscado))
      .sort((primero, segundo) => segundo.fecha.localeCompare(primero.fecha));
    if (encontrados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_BUSQUEDA.SIN_RESULTADOS };
    }
    return { objetos: encontrados, mensaje: '' };
  }
}