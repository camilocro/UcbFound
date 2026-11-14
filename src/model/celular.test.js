import { esCelularValido } from './celular.js';

describe('HU-16 Celular de contacto', () => {
  it('debería aceptar un celular de 8 dígitos que empieza con 7', () => {
    expect(esCelularValido('71234567')).toBe(true);
  });

  it('debería rechazar un celular de menos de 8 dígitos', () => {
    expect(esCelularValido('7123456')).toBe(false);
  });
});