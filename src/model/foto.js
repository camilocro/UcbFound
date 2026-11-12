const PREFIJO_DE_IMAGEN = 'data:image/';
const LADO_MAXIMO_EN_PIXELES = 800;

export function esImagen(foto) {
  return foto.startsWith(PREFIJO_DE_IMAGEN);
}

export function calcularTamanoReducido(ancho, alto) {
  const escala = LADO_MAXIMO_EN_PIXELES / Math.max(ancho, alto);
  return { ancho: Math.round(ancho * escala), alto: Math.round(alto * escala) };
}