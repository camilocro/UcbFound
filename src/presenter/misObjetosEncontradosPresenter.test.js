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
const mochilaDeJuan = { id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: 'mochila.png', correoDeQuienEncontro: 'juan.perez@ucb.edu.bo' };
const llavesDeAna = { id: 'obj-2', nombre: 'Llaves', descripcion: 'Llavero con tres llaves', fecha: '2026-10-16', foto: 'llaves.png', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' };

describe('HU-21 Criterios 2 y 3: solo mis objetos', () => {
  it('debería mostrar solo los objetos que registré, con su foto, nombre y fecha', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar(mochilaDeJuan);
    repositorio.guardar(llavesDeAna);
    const presenter = new MisObjetosEncontradosPresenter(repositorio, sesionDeJuan);
    expect(presenter.obtenerMisObjetos()).toEqual({
      objetos: [{ id: 'obj-1', foto: 'mochila.png', nombre: 'Mochila negra', fecha: '2026-10-15', estado: 'Por recibir' }],
      mensaje: '',
    });
  });
});
describe('HU-21 Criterio 4: objeto recién registrado', () => {
  it('debería mostrar el estado Por recibir en un objeto que acabo de registrar', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar(mochilaDeJuan);
    const presenter = new MisObjetosEncontradosPresenter(repositorio, sesionDeJuan);
    expect(presenter.obtenerMisObjetos().objetos[0].estado).toEqual('Por recibir');
  });
});
describe('HU-21 Criterio 2: objeto ya entregado', () => {
  it('debería mostrar el estado Entregado cuando ya recogieron el objeto', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    repositorio.guardar({ ...mochilaDeJuan, recogida: { nombre: 'Ana López', carnet: '7654321', fecha: '2026-10-20', correoDelEncargado: 'encargado.objetos@ucb.edu.bo' } });
    const presenter = new MisObjetosEncontradosPresenter(repositorio, sesionDeJuan);
    expect(presenter.obtenerMisObjetos().objetos[0].estado).toEqual('Entregado');
  });
});