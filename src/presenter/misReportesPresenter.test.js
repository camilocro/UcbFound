import { MisReportesPresenter } from './misReportesPresenter.js';
import { RepositorioReportes } from '../model/repositorioReportes.js';

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

const mochila = { nombre: 'Mochila negra', descripcion: '', fecha: '2026-10-10', correoDelDueno: 'juan.perez@ucb.edu.bo', bloque: 'Tupuraya 1 - Biblioteca', aula: '' };
const llaves = { nombre: 'Llaves', descripcion: '', fecha: '2026-10-16', correoDelDueno: 'ana.lopez@ucb.edu.bo', bloque: 'Tupuraya 2 - Parqueo', aula: '' };
const calculadora = { nombre: 'Calculadora', descripcion: '', fecha: '2026-10-14', correoDelDueno: 'juan.perez@ucb.edu.bo', bloque: 'Tupuraya 1 - Bloque B', aula: 'B-305' };

describe('HU-17 Criterio 1: ver mis reportes', () => {
  it('debería mostrar solo los reportes de quien inició sesión, del más reciente al más antiguo', () => {
    const repositorio = new RepositorioReportes(crearAlmacenamientoFalso());
    repositorio.guardar(mochila);
    repositorio.guardar(llaves);
    repositorio.guardar(calculadora);
    const presenter = new MisReportesPresenter(repositorio, sesionDeJuan);
    expect(presenter.obtenerMisReportes()).toEqual({ reportes: [calculadora, mochila], mensaje: '' });
  });
});

describe('HU-17 Criterio 2: sin reportes', () => {
  it('debería avisar cuando el usuario todavía no reportó objetos', () => {
    const repositorio = new RepositorioReportes(crearAlmacenamientoFalso());
    repositorio.guardar(llaves);
    const presenter = new MisReportesPresenter(repositorio, sesionDeJuan);
    expect(presenter.obtenerMisReportes()).toEqual({ reportes: [], mensaje: 'Todavía no reportaste ningún objeto perdido' });
  });
});