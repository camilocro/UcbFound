const LARGO_DEL_CELULAR = 8;

export function esCelularValido(celular) {
  return celular.length === LARGO_DEL_CELULAR;
}