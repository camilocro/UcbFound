import { esEncargado } from './encargado.js';

describe('HU-14 Rol de encargado', () => {
  it('debería reconocer el correo del encargado y no el de un usuario común', () => {
    expect(esEncargado('encargado.objetos@ucb.edu.bo')).toBe(true);
    expect(esEncargado('juan.perez@ucb.edu.bo')).toBe(false);
  });
});