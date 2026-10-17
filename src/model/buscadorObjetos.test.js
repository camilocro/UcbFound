import { BuscadorObjetos } from './buscadorObjetos.js';
import { ObjetoEncontrado } from './objetoEncontrado.js';

const objetos = [
  new ObjetoEncontrado({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-10', foto: '', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' }),
  new ObjetoEncontrado({ id: 'obj-2', nombre: 'Cargador de laptop', descripcion: 'Marca HP, cable negro', fecha: '2026-10-14', foto: '', correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' }),
  new ObjetoEncontrado({ id: 'obj-3', nombre: 'Botella de agua', descripcion: 'Botella azul con stickers', fecha: '2026-10-12', foto: '', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' }),
];

const nombres = (resultado) => resultado.objetos.map((objeto) => objeto.nombre);

describe('HU-07 Criterio 1: buscar por nombre o descripción', () => {
  it('debería mostrar los objetos que coinciden con el texto buscado', () => {
    const resultado = new BuscadorObjetos(objetos).buscar('cargador');
    expect(nombres(resultado)).toEqual(['Cargador de laptop']);
  });
});
describe('HU-07 Criterio 2: sin coincidencias', () => {
  it('debería avisar cuando ningún objeto coincide', () => {
    const resultado = new BuscadorObjetos(objetos).buscar('paraguas');
    expect(resultado).toEqual({ objetos: [], mensaje: 'No se encontraron objetos con ese nombre o descripción' });
  });
});