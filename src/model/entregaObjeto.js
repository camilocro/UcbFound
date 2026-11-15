import { ObjetoEncontrado } from './objetoEncontrado.js';

export const MENSAJES_ENTREGA = {
  ENTREGA_REGISTRADA: 'Entrega registrada correctamente',
};

// Aplica las reglas de la HU-15 para entregar un objeto guardado
export class EntregaObjeto {
  constructor(fechaDeHoy) {
    this.fechaDeHoy = fechaDeHoy;
  }

  registrar(objeto, { nombre, carnet }, correoDelEncargado) {
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