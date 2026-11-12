import { DetalleObjetoPresenter } from './detalleObjetoPresenter.js';
import { RepositorioObjetosEncontrados } from '../model/repositorioObjetosEncontrados.js';

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

describe('HU-09 Presenter Criterio 1: ver un objeto de la lista', () => {
  it('debería devolver la foto, el nombre, la descripción y la fecha del objeto elegido', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: 'foto.png', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' });
    const presenter = new DetalleObjetoPresenter(repositorio);
    expect(presenter.verDetalle('obj-1')).toEqual({
      id: 'obj-1',
      foto: 'foto.png',
      nombre: 'Mochila negra',
      descripcion: 'Tiene un llavero de la UCB',
      fecha: '2026-10-15',
      categoria: 'Sin categoría',
      lugar: 'Lugar no indicado',
    });
  });
});
describe('HU-13 Presenter Criterio 6: categoría en el detalle', () => {
  it('debería mostrar la categoría del objeto elegido', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: 'foto.png', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo', categoria: 'Mochilas y bolsos' });
    const presenter = new DetalleObjetoPresenter(repositorio);
    expect(presenter.verDetalle('obj-1').categoria).toEqual('Mochilas y bolsos');
  });
});
describe('HU-13 Presenter Criterio 6: objeto anterior sin categoría', () => {
  it('debería mostrar "Sin categoría" cuando el objeto no tiene una', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: 'foto.png', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' });
    const presenter = new DetalleObjetoPresenter(repositorio);
    expect(presenter.verDetalle('obj-1').categoria).toEqual('Sin categoría');
  });
});
describe('HU-12 Presenter Criterio 6: lugar en el detalle', () => {
  it('debería mostrar el bloque y el aula donde se encontró el objeto', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: 'foto.png', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo', bloque: 'Tupuraya 1 - Bloque A', aula: 'Aula 201' });
    const presenter = new DetalleObjetoPresenter(repositorio);
    expect(presenter.verDetalle('obj-1').lugar).toEqual('Tupuraya 1 - Bloque A, Aula 201');
  });
  it('debería mostrar solo el bloque cuando el objeto no tiene aula', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: 'foto.png', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo', bloque: 'Tupuraya 1 - Biblioteca', aula: '' });
    const presenter = new DetalleObjetoPresenter(repositorio);
    expect(presenter.verDetalle('obj-1').lugar).toEqual('Tupuraya 1 - Biblioteca');
  });
});