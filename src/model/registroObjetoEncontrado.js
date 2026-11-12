import { ObjetoEncontrado } from './objetoEncontrado.js';
import { crearError } from './resultado.js';

export const MENSAJES_REGISTRO_OBJETO = {
  OBJETO_REGISTRADO: 'Objeto registrado correctamente',
  FALTAN_FOTO_O_DESCRIPCION: 'Es necesario agregar una foto y una descripción',
  SOLO_IMAGENES: 'Solo se permiten imágenes',
  FOTO_MUY_PESADA: 'La foto es muy pesada, prueba con una imagen más pequeña',
};

const NOMBRE_POR_DEFECTO = 'Objeto encontrado';

function faltanFotoODescripcion(foto, descripcion) {
  return foto === '' || descripcion.trim() === '';
}

export class RegistroObjetoEncontrado {
  constructor(fechaDeHoy, crearId) {
    this.fechaDeHoy = fechaDeHoy;
    this.crearId = crearId;
  }

  registrar({ nombre, descripcion, foto, categoria }, correoDeQuienEncontro) {
    if (faltanFotoODescripcion(foto, descripcion)) {
      return crearError(MENSAJES_REGISTRO_OBJETO.FALTAN_FOTO_O_DESCRIPCION);
    }
    if (!foto.startsWith('data:image/')) {
      return crearError(MENSAJES_REGISTRO_OBJETO.SOLO_IMAGENES);
    }
    const objeto = new ObjetoEncontrado({
      id: this.crearId(),
      nombre: nombre.trim() || NOMBRE_POR_DEFECTO,
      descripcion: descripcion.trim(),
      fecha: this.fechaDeHoy,
      foto,
      correoDeQuienEncontro,
      categoria,
    });
    return { exito: true, mensaje: MENSAJES_REGISTRO_OBJETO.OBJETO_REGISTRADO, objeto };
  }
}