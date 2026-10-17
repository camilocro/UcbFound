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

const datosMochila = {
  id: 'obj-1',
  nombre: 'Mochila negra',
  descripcion: 'Tiene un llavero de la UCB',
  fecha: '2026-10-15',
  foto: '',
  correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo',
};

describe('HU-07 Repositorio de objetos encontrados', () => {
  it('debería empezar sin objetos', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    expect(repositorio.obtenerTodos()).toEqual([]);
  });
});