import { BusquedaPresenter } from './busquedaPresenter.js';
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

function crearRepositorioConObjetos() {
  const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
  repositorio.guardar({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-10', foto: '', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' });
  repositorio.guardar({ id: 'obj-2', nombre: 'Botella de agua', descripcion: 'Botella azul con stickers', fecha: '2026-10-12', foto: '', correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' });
  return repositorio;
}

describe('HU-07 Presenter: buscar objetos', () => {
  it('debería buscar entre los objetos guardados en el repositorio', () => {
    const presenter = new BusquedaPresenter(crearRepositorioConObjetos());
    const resultado = presenter.buscar('botella');
    expect(resultado.objetos.map((objeto) => objeto.nombre)).toEqual(['Botella de agua']);
  });
});