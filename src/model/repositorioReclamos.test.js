import { RepositorioReclamos } from './repositorioReclamos.js';

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

const reclamoPendiente = {
  id: 'reclamo-1',
  idObjeto: 'ejemplo-1',
  correoDelReclamante: 'majo.sandoval@ucb.edu.bo',
  explicacion: 'Es mía, adentro está mi carnet universitario',
  fecha: '2026-11-12',
  estado: 'pendiente',
};

describe('HU-10 Criterio 7: la solicitud queda guardada', () => {
  it('debería guardar la solicitud y recuperarla después de recargar', () => {
    const almacenamiento = crearAlmacenamientoFalso();
    new RepositorioReclamos(almacenamiento).guardar(reclamoPendiente);
    const reclamosGuardados = new RepositorioReclamos(almacenamiento).obtenerTodos();
    expect(reclamosGuardados).toEqual([reclamoPendiente]);
    expect(reclamosGuardados[0].fueEnviadoPor('majo.sandoval@ucb.edu.bo')).toBe(true);
  });
});