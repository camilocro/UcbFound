import { ReclamoPresenter } from './reclamoPresenter.js';
import { RepositorioReclamos } from '../model/repositorioReclamos.js';
import {
  RepositorioObjetosEncontrados,
} from '../model/repositorioObjetosEncontrados.js';
import { Sesion } from '../model/sesion.js';
import { cargarDatosDeEjemplo } from '../model/datosDeEjemplo.js';

function crearAlmacenamientoFalso() {
  const valoresGuardados = {};
  return {
    getItem: (clave) => (clave in valoresGuardados ? valoresGuardados[clave] : null),
    setItem: (clave, valor) => {
      valoresGuardados[clave] = String(valor);
    },
    removeItem: (clave) => {
      delete valoresGuardados[clave];
    },
  };
}

const EXPLICACION = 'Es mía, adentro está mi carnet universitario';

function crearPresenter(repositorioReclamos) {
  const repositorioObjetosEncontrados = new RepositorioObjetosEncontrados(
    crearAlmacenamientoFalso(),
  );
  cargarDatosDeEjemplo(repositorioObjetosEncontrados);
  const sesion = new Sesion(crearAlmacenamientoFalso());
  sesion.iniciar({ nombre: 'Majo Sandoval', correo: 'majo.sandoval@ucb.edu.bo' });
  return new ReclamoPresenter(
    repositorioReclamos,
    repositorioObjetosEncontrados,
    sesion,
    () => new Date(2026, 10, 12),
    () => 'reclamo-1',
  );
}

describe('HU-10 Presenter Criterio 7: solicitud guardada a mi nombre', () => {
  it('debería guardar la solicitud con el correo de la sesión y la fecha de hoy', () => {
    const repositorioReclamos = new RepositorioReclamos(crearAlmacenamientoFalso());
    crearPresenter(repositorioReclamos).enviarReclamo('ejemplo-1', EXPLICACION);
    expect(repositorioReclamos.obtenerTodos()).toEqual([
      {
        id: 'reclamo-1',
        idObjeto: 'ejemplo-1',
        correoDelReclamante: 'majo.sandoval@ucb.edu.bo',
        explicacion: EXPLICACION,
        fecha: '2026-11-12',
        estado: 'pendiente',
      },
    ]);
  });
});

describe('HU-10 Presenter Criterio 5: solicitud repetida', () => {
  it('debería avisar que ya envió una solicitud si la anterior está guardada', () => {
    const repositorioReclamos = new RepositorioReclamos(crearAlmacenamientoFalso());
    const presenter = crearPresenter(repositorioReclamos);
    presenter.enviarReclamo('ejemplo-1', EXPLICACION);
    expect(presenter.enviarReclamo('ejemplo-1', EXPLICACION)).toEqual({
      exito: false,
      mensaje: 'Ya enviaste una solicitud para este objeto',
    });
    expect(repositorioReclamos.obtenerTodos()).toHaveLength(1);
  });
});