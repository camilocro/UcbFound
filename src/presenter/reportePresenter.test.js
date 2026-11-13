import { ReportePresenter } from './reportePresenter.js';
import { RepositorioReportes } from '../model/repositorioReportes.js';
import { Sesion } from '../model/sesion.js';
import { BLOQUES } from '../model/bloques.js';

// Almacenamiento falso que funciona igual que localStorage y sessionStorage
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

describe('HU-04 Presenter Criterio 1: reporte guardado a mi nombre', () => {
  it('debería guardar el reporte con el correo del usuario que tiene la sesión', () => {
    const repositorio = new RepositorioReportes(crearAlmacenamientoFalso());
    const sesion = new Sesion(crearAlmacenamientoFalso());
    sesion.iniciar({ nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo' });
    const presenter = new ReportePresenter(repositorio, sesion, () => new Date(2026, 9, 17));
    presenter.reportarObjeto({
      nombre: 'Mochila negra',
      descripcion: 'Con llavero de la UCB',
      fecha: '2026-10-15',
      bloque: 'Tupuraya 2 - Bloque A',
      aula: 'A-204',
    });
    expect(repositorio.obtenerReportesDe('juan.perez@ucb.edu.bo')).toEqual([
      {
        nombre: 'Mochila negra',
        descripcion: 'Con llavero de la UCB',
        fecha: '2026-10-15',
        correoDelDueno: 'juan.perez@ucb.edu.bo',
        bloque: 'Tupuraya 2 - Bloque A',
        aula: 'A-204',
      },
    ]);
  });
});

describe('HU-05 Presenter Criterio 1: lista de bloques', () => {
  it('debería ofrecer al formulario la lista oficial de bloques', () => {
    const repositorio = new RepositorioReportes(crearAlmacenamientoFalso());
    const sesion = new Sesion(crearAlmacenamientoFalso());
    const presenter = new ReportePresenter(repositorio, sesion);
    expect(presenter.obtenerBloques()).toEqual(BLOQUES);
  });
});