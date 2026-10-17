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