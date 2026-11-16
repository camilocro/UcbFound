export function describirCantidadDeObjetos(cantidad) {
  if (cantidad === 1) {
    return '1 objeto encontrado';
  }
  return `${cantidad} objetos encontrados`;
}