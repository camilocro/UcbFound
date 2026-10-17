export const MENSAJES_BUSQUEDA = {
  SIN_RESULTADOS: 'No se encontraron objetos con ese nombre o descripción',
};

export class BuscadorObjetos {
  constructor(objetos) {
    this.objetos = objetos;
  }

  buscar(texto) {
    const encontrados = this.objetos.filter((objeto) => objeto.coincideCon(texto));
    if (encontrados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_BUSQUEDA.SIN_RESULTADOS };
    }
    return { objetos: encontrados, mensaje: '' };
  }
}