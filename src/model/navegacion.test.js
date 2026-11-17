import { obtenerOpcionesDeNavegacion } from './navegacion.js';

describe('Barra de navegación Criterio 2: opciones del estudiante', () => {
  it('debería ofrecer Inicio, Buscar, Reportar y Registrar, en ese orden', () => {
    const opciones = obtenerOpcionesDeNavegacion(false, 'principal');
    expect(opciones.map((opcion) => opcion.texto)).toEqual([
      'Inicio',
      'Buscar objetos',
      'Reportar objeto perdido',
      'Registrar objeto encontrado',
    ]);
    expect(opciones.map((opcion) => opcion.pagina)).toEqual([
      'principal',
      'buscar-objetos',
      'reportar-objeto',
      'registrar-objeto',
    ]);
  });
});