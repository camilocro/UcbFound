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

describe('HU-07 Criterio 3: buscar sin escribir nada', () => {
  it('debería mostrar todos los objetos del más reciente al más antiguo', () => {
    const resultado = new BuscadorObjetos(objetos).buscar('');
    expect(nombres(resultado)).toEqual(['Cargador de laptop', 'Botella de agua', 'Mochila negra']);
  });
});

describe('HU-07 Criterio 3: objetos del mismo día', () => {
  it('debería mostrar primero el último objeto registrado cuando tienen la misma fecha', () => {
    const delMismoDia = [
      new ObjetoEncontrado({ id: 'obj-4', nombre: 'Gorra azul', descripcion: 'Gorra con el logo de la UCB', fecha: '2026-10-14', foto: '', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' }),
      new ObjetoEncontrado({ id: 'obj-5', nombre: 'Termo rojo', descripcion: 'Termo de metal', fecha: '2026-10-14', foto: '', correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' }),
    ];
    expect(nombres(new BuscadorObjetos(delMismoDia).buscar(''))).toEqual(['Termo rojo', 'Gorra azul']);
  });
});
const objetosConCategoria = [
  new ObjetoEncontrado({
    id: 'cat-1',
    nombre: 'Mochila negra',
    descripcion: 'Tiene un llavero de la UCB',
    fecha: '2026-10-10',
    foto: '',
    correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo',
    categoria: 'Mochilas y bolsos',
  }),
  new ObjetoEncontrado({
    id: 'cat-2',
    nombre: 'Cargador de laptop',
    descripcion: 'Marca HP, cable negro',
    fecha: '2026-10-14',
    foto: '',
    correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo',
    categoria: 'Electrónica',
  }),
  new ObjetoEncontrado({
    id: 'cat-3',
    nombre: 'Audífonos negros',
    descripcion: 'Audífonos con estuche',
    fecha: '2026-10-12',
    foto: '',
    correoDeQuienEncontro: 'maria.vargas@ucb.edu.bo',
    categoria: 'Electrónica',
  }),
  new ObjetoEncontrado({
    id: 'cat-4',
    nombre: 'Botella de agua',
    descripcion: 'Botella azul con stickers',
    fecha: '2026-10-08',
    foto: '',
    correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo',
  }),
];

describe('HU-08 Criterio 2: elegir una categoría sin escribir texto', () => {
  it('debería mostrar solo los objetos de esa categoría, del más reciente al más antiguo', () => {
    const resultado = new BuscadorObjetos(objetosConCategoria).buscar('', 'Electrónica');

    expect(nombres(resultado)).toEqual([
      'Cargador de laptop',
      'Audífonos negros',
    ]);
  });
});

describe('HU-08 Criterio 3: categoría y texto a la vez', () => {
  it('debería mostrar solo los objetos que cumplen las dos condiciones', () => {
    const resultado = new BuscadorObjetos(objetosConCategoria).buscar('negr', 'Mochilas y bolsos');

    expect(nombres(resultado)).toEqual(['Mochila negra']);
  });
});

describe('HU-08 Criterios 5, 6 y 7: con "Todas"', () => {
  it('debería mostrar todos los objetos, también los sin categoría, del más reciente al más antiguo', () => {
    const resultado = new BuscadorObjetos(objetosConCategoria).buscar('', 'Todas');

    expect(nombres(resultado)).toEqual([
      'Cargador de laptop',
      'Audífonos negros',
      'Mochila negra',
      'Botella de agua',
    ]);
  });
});