import { convertirFechaATexto, convertirFechaYHoraATexto } from './fecha.js';

describe('HU-04 Fecha de hoy', () => {
  it('debería convertir una fecha al formato AAAA-MM-DD', () => {
    expect(convertirFechaATexto(new Date(2026, 9, 5))).toEqual('2026-10-05');
  });
});
describe('HU-15 Fecha y hora de la entrega', () => {
  it('debería convertir una fecha con hora al formato AAAA-MM-DD HH:MM', () => {
    expect(convertirFechaYHoraATexto(new Date(2026, 9, 20, 9, 5))).toEqual('2026-10-20 09:05');
  });
});