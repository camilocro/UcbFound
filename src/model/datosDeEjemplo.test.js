import { cargarDatosDeEjemplo } from './datosDeEjemplo.js';
import { RepositorioObjetosEncontrados } from './repositorioObjetosEncontrados.js';

function crearAlmacenamientoFalso() {
  const datos = {};
  return {
    getItem: (clave) => (clave in datos ? datos[clave] : null),
    setItem: (clave, valor) => {
      datos[clave] = String(valor);
    },
    removeItem: (clave) => {
      delete datos[clave];
    },
  };
}

describe('Datos de ejemplo', () => {
  it('debería cargar los 6 objetos de ejemplo cuando no hay objetos guardados', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    cargarDatosDeEjemplo(repositorio);
    expect(repositorio.obtenerTodos().length).toBe(6);
  });
});

describe('Datos de ejemplo: sin duplicar', () => {
  it('no debería volver a cargarlos si ya hay objetos guardados', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    cargarDatosDeEjemplo(repositorio);
    cargarDatosDeEjemplo(repositorio);
    expect(repositorio.obtenerTodos().length).toBe(6);
  });
});
describe('Datos de ejemplo: categoría', () => {
  it('debería cargar cada objeto de ejemplo con su categoría', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    cargarDatosDeEjemplo(repositorio);
    const categorias = repositorio.obtenerTodos().map((objeto) => objeto.categoria);
    expect(categorias).toEqual([
      'Mochilas y bolsos',
      'Electrónica',
      'Botellas y termos',
      'Electrónica',
      'Llaves',
      'Electrónica',
    ]);
  });
});
describe('Datos de ejemplo: categoría en ejemplos ya guardados', () => {
  it('debería agregar la categoría a un ejemplo que se guardó antes sin ella', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ id: 'ejemplo-1', nombre: 'Mochila negra', descripcion: 'Mochila con un llavero de la UCB', fecha: '2026-10-06', foto: 'https://foto.jpg', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' });
    cargarDatosDeEjemplo(repositorio);
    expect(repositorio.buscarPorId('ejemplo-1').obtenerDetalle().categoria).toEqual('Mochilas y bolsos');
  });
});
describe('Datos de ejemplo: lugar', () => {
  it('debería cargar cada objeto de ejemplo con el lugar donde se encontró', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    cargarDatosDeEjemplo(repositorio);
    const lugares = repositorio.obtenerTodos().map((objeto) => objeto.obtenerDetalle().lugar);
    expect(lugares).toEqual([
      'Tupuraya 1 - Biblioteca',
      'Tupuraya 2 - Bloque A, A-204',
      'Tupuraya 2 - Canchas',
      'Tupuraya 2 - Bloque C, C-101',
      'Tupuraya 2 - Parqueo',
      'Tupuraya 1 - Bloque B, B-305',
    ]);
  });
});