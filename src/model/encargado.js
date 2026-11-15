// Correos de las cuentas que tienen el rol de encargado de objetos de la UCB
export const CORREOS_DE_ENCARGADOS = ['encargado.objetos@ucb.edu.bo'];

export function esEncargado(correo) {
  return CORREOS_DE_ENCARGADOS.includes(correo);
}