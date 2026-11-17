const OPCIONES_DE_NAVEGACION = [
  { pagina: 'principal', texto: 'Inicio' },
  { pagina: 'buscar-objetos', texto: 'Buscar objetos' },
  { pagina: 'reportar-objeto', texto: 'Reportar objeto perdido' },
  { pagina: 'registrar-objeto', texto: 'Registrar objeto encontrado' },
];

const OPCION_DEL_ENCARGADO = { pagina: 'objetos-guardados', texto: 'Objetos guardados' };

export function obtenerOpcionesDeNavegacion(esEncargado, paginaActual) {
  const opciones = esEncargado
    ? [...OPCIONES_DE_NAVEGACION, OPCION_DEL_ENCARGADO]
    : OPCIONES_DE_NAVEGACION;

  return opciones.map((opcion) => ({
    ...opcion,
    activa: opcion.pagina === paginaActual,
  }));
}