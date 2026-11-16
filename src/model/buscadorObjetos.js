
import { TODAS_LAS_CATEGORIAS } from './categorias.js';
import { ordenarDelMasRecienteAlMasAntiguo } from './orden.js';
export const MENSAJES_BUSQUEDA = {
  SIN_RESULTADOS: 'No se encontraron objetos con ese nombre, descripción o categoría',
};
export class BuscadorObjetos {
  constructor(objetos) {
    this.objetos = objetos;
  }

  buscar(texto, categoria = TODAS_LAS_CATEGORIAS) {
    const textoBuscado = texto.trim();

        const objetosEncontrados = ordenarDelMasRecienteAlMasAntiguo(
      this.objetos.filter((objeto) =>
        !objeto.fueRecogido() &&
        objeto.coincideCon(textoBuscado) &&
        objeto.esDeCategoria(categoria)
      )
    );

    if (objetosEncontrados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_BUSQUEDA.SIN_RESULTADOS };
    }

    return { objetos: objetosEncontrados, mensaje: '' };
  }
}
