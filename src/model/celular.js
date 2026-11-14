const FORMATO_DE_CELULAR = /^[67]\d{7}$/;

export function esCelularValido(celular) {
  return FORMATO_DE_CELULAR.test(celular);
}