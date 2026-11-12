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
    const vista = mochila.obtenerVistaBasica();
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
    expect('correoDeQuienEncontro' in mochila.obtenerVistaBasica()).toBe(false);
  });
});

describe('HU-07 Objeto encontrado: tildes', () => {
  it('debería coincidir aunque se escriba sin tildes', () => {
    const audifonos = new ObjetoEncontrado({ ...mochila, id: 'obj-2', nombre: 'Audífonos', descripcion: 'Inalámbricos y blancos' });
    expect(audifonos.coincideCon('audifonos')).toBe(true);
  });
});

describe('HU-08 Objeto encontrado: categoría', () => {
  it('debería pertenecer a la categoría con la que se registró', () => {
    const cargador = new ObjetoEncontrado({
      id: 'obj-2',
      nombre: 'Cargador de laptop',
      descripcion: 'Marca HP, cable negro',
      fecha: '2026-10-14',
      foto: '',
      correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo',
      categoria: 'Electrónica',
    });

    expect(cargador.esDeCategoria('Electrónica')).toBe(true);
    expect(cargador.esDeCategoria('Llaves')).toBe(false);
  });
});
describe('HU-08 Objeto encontrado: objetos anteriores sin categoría', () => {
  it('debería aparecer solo con "Todas" cuando no tiene categoría', () => {
    expect(mochila.esDeCategoria('Todas')).toBe(true);
    expect(mochila.esDeCategoria('Llaves')).toBe(false);
  });
});