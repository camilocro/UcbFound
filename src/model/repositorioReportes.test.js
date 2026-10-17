import { RepositorioReportes } from './repositorioReportes.js';

// Almacenamiento falso que funciona igual que localStorage
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

const mochila = { nombre: 'Mochila negra', descripcion: '', fecha: '2026-10-15', correoDelDueno: 'juan.perez@ucb.edu.bo' };
const llaves = { nombre: 'Llaves', descripcion: '', fecha: '2026-10-16', correoDelDueno: 'ana.lopez@ucb.edu.bo' };

describe('HU-04 Repositorio de objetos perdidos', () => {
  it('debería empezar sin reportes', () => {
    const repositorio = new RepositorioReportes(crearAlmacenamientoFalso());
    expect(repositorio.obtenerReportes()).toEqual([]);
  });
});

describe('HU-04 Repositorio de objetos perdidos: guardar', () => {
  it('debería guardar los reportes y devolver solo los de cada dueño', () => {
    const repositorio = new RepositorioReportes(crearAlmacenamientoFalso());
    repositorio.guardar(mochila);
    repositorio.guardar(llaves);
    expect(repositorio.obtenerReportesDe('juan.perez@ucb.edu.bo')).toEqual([mochila]);
  });
});