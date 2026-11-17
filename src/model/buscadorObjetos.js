import { TODAS_LAS_CATEGORIAS } from './categorias.js';
import { TODOS_LOS_LUGARES } from './bloques.js';
import { ordenarDelMasRecienteAlMasAntiguo } from './orden.js';

export const MENSAJES_BUSQUEDA = {
    SIN_RESULTADOS: 'No se encontraron objetos con ese nombre, descripción o categoría',
  SIN_OBJETOS_EN_LUGAR: 'No hay objetos encontrados en este lugar',
};

export class BuscadorObjetos {
  constructor(objetos) {
    this.objetos = objetos;
  }

  buscar(texto, categoria = TODAS_LAS_CATEGORIAS, lugar = TODOS_LOS_LUGARES) {
    const textoBuscado = texto.trim();

    const objetosEncontrados = ordenarDelMasRecienteAlMasAntiguo(
      this.objetos.filter((objeto) =>
        !objeto.fueRecogido() &&
        objeto.coincideCon(textoBuscado) &&
        objeto.esDeCategoria(categoria) &&
        objeto.estaEnLugar(lugar)
      )
    );

        if (objetosEncontrados.length === 0 && lugar !== TODOS_LOS_LUGARES) {
      return { objetos: [], mensaje: MENSAJES_BUSQUEDA.SIN_OBJETOS_EN_LUGAR };
    }
    if (objetosEncontrados.length === 0) {
      return { objetos: [], mensaje: MENSAJES_BUSQUEDA.SIN_RESULTADOS };
    }

    return { objetos: objetosEncontrados, mensaje: '' };
  }
}