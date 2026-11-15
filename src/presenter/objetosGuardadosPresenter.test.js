import { ObjetosGuardadosPresenter } from './objetosGuardadosPresenter.js';
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

describe('HU-14 Presenter: ver los objetos guardados', () => {
  it('debería devolver los objetos guardados con los datos para el encargado', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: 'foto.png', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo', bloque: 'Tupuraya 1 - Biblioteca' });
    const presenter = new ObjetosGuardadosPresenter(repositorio);
    expect(presenter.obtenerObjetosGuardados()).toEqual({
      objetos: [{
        id: 'obj-1',
        foto: 'foto.png',
        nombre: 'Mochila negra',
        descripcion: 'Tiene un llavero de la UCB',
        fecha: '2026-10-15',
        lugar: 'Tupuraya 1 - Biblioteca',
        correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo',
      }],
      mensaje: '',
    });
  });
});