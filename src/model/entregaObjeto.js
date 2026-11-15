import { ObjetoEncontrado } from './objetoEncontrado.js';
import { crearError } from './resultado.js';

export const MENSAJES_ENTREGA = {
  ENTREGA_REGISTRADA: 'Entrega registrada correctamente',
    FALTAN_DATOS: 'Es necesario ingresar el nombre y el carnet de quien recoge',
  YA_ENTREGADO: 'Este objeto ya fue entregado',
};

// Aplica las reglas de la HU-15 para entregar un objeto guardado
export class EntregaObjeto {
  constructor(fechaDeHoy) {
    this.fechaDeHoy = fechaDeHoy;
  }

  registrar(objeto, { nombre, carnet }, correoDelEncargado) {
        if (objeto.fueRecogido()) {
      return crearError(MENSAJES_ENTREGA.YA_ENTREGADO);
    }
    if (nombre.trim() === '' || carnet.trim() === '') {
      return crearError(MENSAJES_ENTREGA.FALTAN_DATOS);
    }
    const recogida = {
      nombre: nombre.trim(),
      carnet: carnet.trim(),
      fecha: this.fechaDeHoy,
      correoDelEncargado,
    };
    return {
      exito: true,
      mensaje: MENSAJES_ENTREGA.ENTREGA_REGISTRADA,
      objeto: new ObjetoEncontrado({ ...objeto, recogida }),
    };
  }
}