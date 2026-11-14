import { esCelularValido } from './celular.js';

describe('HU-16 Celular de contacto', () => {
  it('debería aceptar un celular de 8 dígitos que empieza con 7', () => {
    expect(esCelularValido('71234567')).toBe(true);
  });
});