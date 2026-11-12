
import { TODAS_LAS_CATEGORIAS } from './categorias.js';

export const MENSAJES_BUSQUEDA = {
  SIN_RESULTADOS: 'No se encontraron objetos con ese nombre o descripción',
};

export class BuscadorObjetos {
  constructor(objetos) {
    this.objetos = objetos;
  }

  buscar(texto, categoria = TODAS_LAS_CATEGORIAS) {
    const textoBuscado = texto.trim();

    const objetosEncontrados = [...this.objetos]
      .reverse()
      .filter((objeto) =>
        objeto.coincideCon(textoBuscado) &&
        objeto.esDeCategoria(categoria)
      )
      .sort((primero, segundo) =>
        segundo.fecha.localeCompare(primero.fecha)
      );

    if (objetosEncontrados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_BUSQUEDA.SIN_RESULTADOS };
    }

    return { objetos: objetosEncontrados, mensaje: '' };
  }
}
