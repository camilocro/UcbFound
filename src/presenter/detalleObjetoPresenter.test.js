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
    });
  });
});