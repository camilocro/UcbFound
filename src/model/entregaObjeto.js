import { ObjetoEncontrado } from './objetoEncontrado.js';
import { crearError } from './resultado.js';
import { esEncargado } from './encargado.js';

export const MENSAJES_ENTREGA = {
  ENTREGA_REGISTRADA: 'Entrega registrada correctamente',
  FALTA_NOMBRE: 'Es necesario ingresar el nombre de quien recoge el objeto',
    YA_ENTREGADO: 'Este objeto ya fue entregado',
  SOLO_ENCARGADO: 'Solo el encargado puede registrar la entrega',
};

// Aplica las reglas de la HU-15 para entregar un objeto guardado
export class EntregaObjeto {
  constructor(fechaYHora) {
    this.fechaYHora = fechaYHora;
  }

  registrar(objeto, { nombre, carnet = '' }, correoDelEncargado) {
        if (!esEncargado(correoDelEncargado)) {
      return crearError(MENSAJES_ENTREGA.SOLO_ENCARGADO);
    }
    if (objeto.fueRecogido()) {
      return crearError(MENSAJES_ENTREGA.YA_ENTREGADO);
    }
    if (nombre.trim() === '') {
      return crearError(MENSAJES_ENTREGA.FALTA_NOMBRE);
    }
    const recogida = {
      nombre: nombre.trim(),
      carnet: carnet.trim(),
      fecha: this.fechaYHora,
      correoDelEncargado,
    };
    return {
      exito: true,
      mensaje: MENSAJES_ENTREGA.ENTREGA_REGISTRADA,
      objeto: new ObjetoEncontrado({ ...objeto, recogida }),
    };
  }
}