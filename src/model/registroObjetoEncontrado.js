import { ObjetoEncontrado } from './objetoEncontrado.js';
import { crearError } from './resultado.js';
import { CATEGORIAS } from './categorias.js';
import { esImagen } from './foto.js';
import { esCelularValido } from './celular.js';

export const MENSAJES_REGISTRO_OBJETO = {
  OBJETO_REGISTRADO: 'Objeto registrado correctamente',
  FALTAN_FOTO_O_DESCRIPCION: 'Es necesario agregar una foto y una descripción',
  SOLO_IMAGENES: 'Solo se permiten imágenes',
  FOTO_MUY_PESADA: 'La foto es muy pesada, prueba con una imagen más pequeña',
  FALTA_CATEGORIA: 'Es necesario elegir una categoría',
  FALTA_BLOQUE: 'Es necesario indicar el bloque donde lo encontraste',
  CELULAR_INVALIDO: 'Ingrese un número de celular válido',
  NO_SE_PUDO_GUARDAR: 'No se pudo guardar el objeto, intenta de nuevo',
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

  registrar({ nombre, descripcion, foto, categoria, bloque, aula, celular }, correoDeQuienEncontro) {
    if (faltanFotoODescripcion(foto, descripcion)) {
      return crearError(MENSAJES_REGISTRO_OBJETO.FALTAN_FOTO_O_DESCRIPCION);
    }
    if (!esImagen(foto)) {
      return crearError(MENSAJES_REGISTRO_OBJETO.SOLO_IMAGENES);
    }
    if (!CATEGORIAS.includes(categoria)) {
      return crearError(MENSAJES_REGISTRO_OBJETO.FALTA_CATEGORIA);
    }
    if (!bloque) {
      return crearError(MENSAJES_REGISTRO_OBJETO.FALTA_BLOQUE);
    }
    if (celular !== undefined && !esCelularValido(celular)) {
      return crearError(MENSAJES_REGISTRO_OBJETO.CELULAR_INVALIDO);
    }
    const objeto = new ObjetoEncontrado({
      id: this.crearId(),
      nombre: nombre.trim() || NOMBRE_POR_DEFECTO,
      descripcion: descripcion.trim(),
      fecha: this.fechaDeHoy,
      foto,
      correoDeQuienEncontro,
      categoria,
      bloque,
      aula: (aula || '').trim(),
      celular,
    });
    return { exito: true, mensaje: MENSAJES_REGISTRO_OBJETO.OBJETO_REGISTRADO, objeto };
  }
}