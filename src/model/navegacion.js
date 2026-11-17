const OPCIONES_DE_NAVEGACION = [
  { pagina: 'principal', texto: 'Inicio' },
  { pagina: 'buscar-objetos', texto: 'Buscar objetos' },
  { pagina: 'reportar-objeto', texto: 'Reportar objeto perdido' },
  { pagina: 'registrar-objeto', texto: 'Registrar objeto encontrado' },
];

const OPCION_DEL_ENCARGADO = { pagina: 'objetos-guardados', texto: 'Objetos guardados' };

export function obtenerOpcionesDeNavegacion(esEncargado) {
  if (esEncargado) {
    return [...OPCIONES_DE_NAVEGACION, OPCION_DEL_ENCARGADO];
  }
  return OPCIONES_DE_NAVEGACION;
}