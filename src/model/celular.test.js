import { esCelularValido, esCelularOpcionalValido } from './celular.js';

describe('HU-16 Celular de contacto', () => {
  it('debería aceptar un celular de 8 dígitos que empieza con 7', () => {
    expect(esCelularValido('71234567')).toBe(true);
  });

  it('debería rechazar un celular de menos de 8 dígitos', () => {
    expect(esCelularValido('7123456')).toBe(false);
  });

  it('debería rechazar un celular que no empieza con 6 o 7', () => {
    expect(esCelularValido('51234567')).toBe(false);
  });
});

describe('HU-16 Celular de contacto: solo dígitos', () => {
  it('debería rechazar un celular de 8 caracteres que tiene letras', () => {
    expect(esCelularValido('7123abcd')).toBe(false);
  });
});

describe('HU-16 y HU-20 Celular de contacto: opcional', () => {
  it('debería aceptar un celular vacío porque es opcional', () => {
    expect(esCelularOpcionalValido('')).toBe(true);
  });
});