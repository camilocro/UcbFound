import { fechaComoTexto } from './fecha.js';

describe('HU-04 Fecha de hoy', () => {
  it('debería convertir una fecha al formato AAAA-MM-DD', () => {
    expect(fechaComoTexto(new Date(2026, 9, 5))).toEqual('2026-10-05');
  });
});