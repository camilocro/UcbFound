import { BLOQUES } from './bloques.js';

describe('Lista compartida de bloques', () => {
  it('debería tener opciones disponibles', () => {
    expect(BLOQUES.length).toBeGreaterThan(0);
  });

  it('no debería tener opciones repetidas', () => {
    expect(new Set(BLOQUES).size).toBe(BLOQUES.length);
  });
});