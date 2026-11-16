// Ordena por fecha, de la más reciente a la más antigua.
// Si dos tienen la misma fecha, va primero el último que se guardó.
// No cambia la lista original.
export function ordenarDelMasRecienteAlMasAntiguo(lista) {
  return [...lista]
    .reverse()
    .sort((primero, segundo) => segundo.fecha.localeCompare(primero.fecha));
}