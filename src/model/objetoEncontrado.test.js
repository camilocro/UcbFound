import { ObjetoEncontrado } from './objetoEncontrado.js';

const mochila = new ObjetoEncontrado({
  id: 'obj-1',
  nombre: 'Mochila negra',
  descripcion: 'Tiene un llavero de la UCB',
  fecha: '2026-10-15',
  foto: 'data:image/png;base64,AAA',
  correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo',
});

describe('HU-07 Objeto encontrado: buscar por nombre', () => {
  it('debería coincidir cuando el texto está en el nombre', () => {
    expect(mochila.coincideCon('Mochila')).toBe(true);
  });

});

describe('HU-07 Objeto encontrado: buscar por descripción', () => {
  it('debería coincidir cuando el texto está en la descripción', () => {
    expect(mochila.coincideCon('llavero')).toBe(true);
  });
});

describe('HU-07 Objeto encontrado: mayúsculas', () => {
  it('debería coincidir sin importar mayúsculas y minúsculas', () => {
    expect(mochila.coincideCon('MOCHILA')).toBe(true);
  });
});

describe('HU-09 Criterio 1: vista básica del objeto', () => {
  it('debería mostrar la foto, el nombre, la descripción y la fecha', () => {
    const vista = mochila.vistaBasica();
    expect([vista.foto, vista.nombre, vista.descripcion, vista.fecha]).toEqual([
      'data:image/png;base64,AAA',
      'Mochila negra',
      'Tiene un llavero de la UCB',
      '2026-10-15',
    ]);
  });
});

describe('HU-09 Criterio 2: sin datos personales', () => {
  it('no debería mostrar los datos de quien encontró el objeto', () => {
    expect('correoDeQuienEncontro' in mochila.vistaBasica()).toBe(false);
  });
});