import { MisObjetosEncontradosPresenter } from './misObjetosEncontradosPresenter.js';
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

const juan = { nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo' };
const sesionDeJuan = { obtenerUsuario: () => juan };

describe('HU-21 Criterio 5: sin objetos registrados', () => {
  it('debería avisar cuando el usuario todavía no registró objetos encontrados', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    const presenter = new MisObjetosEncontradosPresenter(repositorio, sesionDeJuan);
    expect(presenter.obtenerMisObjetos()).toEqual({ objetos: [], mensaje: 'Todavía no registraste ningún objeto encontrado' });
  });
});