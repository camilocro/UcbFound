import { ObjetoEncontrado } from './objetoEncontrado.js';

export const MENSAJES_REGISTRO_OBJETO = {
  OBJETO_REGISTRADO: 'Objeto registrado correctamente',
  FALTAN_FOTO_O_DESCRIPCION: 'Es necesario agregar una foto y una descripción',
};

const NOMBRE_POR_DEFECTO = 'Objeto encontrado';

export class RegistroObjetoEncontrado {
  constructor(fechaDeHoy, crearId) {
    this.fechaDeHoy = fechaDeHoy;
    this.crearId = crearId;
  }

  registrar({ nombre, descripcion, foto }, correoDeQuienEncontro) {
    if (foto === '' || descripcion.trim() === '') {
      return this.crearError(MENSAJES_REGISTRO_OBJETO.FALTAN_FOTO_O_DESCRIPCION);
    }
    const objeto = new ObjetoEncontrado({
      id: this.crearId(),
      nombre: nombre.trim() || NOMBRE_POR_DEFECTO,
      descripcion: descripcion.trim(),
      fecha: this.fechaDeHoy,
      foto,
      correoDeQuienEncontro,
    });
    return { exito: true, mensaje: MENSAJES_REGISTRO_OBJETO.OBJETO_REGISTRADO, objeto };
  }

  crearError(mensaje) {
    return { exito: false, mensaje };
  }
}