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

describe('Barra de navegación Criterio 3: opción del encargado', () => {
  it('debería agregar Objetos guardados al final solo para el encargado', () => {
    const delEncargado = obtenerOpcionesDeNavegacion(true, 'principal');
    expect(delEncargado).toHaveLength(5);
    expect(delEncargado[4].pagina).toEqual('objetos-guardados');
    expect(delEncargado[4].texto).toEqual('Objetos guardados');

    const delEstudiante = obtenerOpcionesDeNavegacion(false, 'principal');
    expect(delEstudiante.map((opcion) => opcion.pagina)).not.toContain('objetos-guardados');
  });
});