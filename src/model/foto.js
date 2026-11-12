const PREFIJO_DE_IMAGEN = 'data:image/';

export function esImagen(foto) {
  return foto.startsWith(PREFIJO_DE_IMAGEN);
}