const LARGO_DEL_CELULAR = 8;
const PRIMEROS_DIGITOS_VALIDOS = ['6', '7'];

export function esCelularValido(celular) {
  return (
    celular.length === LARGO_DEL_CELULAR &&
    PRIMEROS_DIGITOS_VALIDOS.includes(celular[0])
  );
}