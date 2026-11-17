const OPCIONES_DE_NAVEGACION = [
  { pagina: 'principal', texto: 'Inicio' },
  { pagina: 'buscar-objetos', texto: 'Buscar objetos' },
  { pagina: 'reportar-objeto', texto: 'Reportar objeto perdido' },
  { pagina: 'registrar-objeto', texto: 'Registrar objeto encontrado' },
];

export function obtenerOpcionesDeNavegacion() {
  return OPCIONES_DE_NAVEGACION;
}