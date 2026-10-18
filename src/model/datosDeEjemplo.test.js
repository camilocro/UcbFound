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