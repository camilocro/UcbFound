function crearFoto(emoji, fondo) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240"><rect width="100%" height="100%" fill="${fondo}"/><text x="50%" y="54%" font-size="110" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const OBJETOS_DE_EJEMPLO = [
  { id: 'ejemplo-1', nombre: 'Mochila negra', descripcion: 'Mochila con un llavero de la UCB y cuadernos adentro', fecha: '2026-10-06', foto: crearFoto('🎒', '#dbe4f3'), correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' },
  { id: 'ejemplo-2', nombre: 'Cargador de laptop', descripcion: 'Cargador marca HP con cable negro', fecha: '2026-10-08', foto: crearFoto('🔌', '#fff4cc'), correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' },
  { id: 'ejemplo-3', nombre: 'Botella de agua', descripcion: 'Botella azul de metal con stickers', fecha: '2026-10-09', foto: crearFoto('🥤', '#dcfce7'), correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' },
  { id: 'ejemplo-4', nombre: 'Audífonos', descripcion: 'Audífonos inalámbricos blancos en su estuche', fecha: '2026-10-11', foto: crearFoto('🎧', '#fee2e2'), correoDeQuienEncontro: 'maria.vargas@ucb.edu.bo' },
  { id: 'ejemplo-5', nombre: 'Llaves', descripcion: 'Llavero con tres llaves y un destapador', fecha: '2026-10-13', foto: crearFoto('🔑', '#ede9fe'), correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' },
  { id: 'ejemplo-6', nombre: 'Calculadora', descripcion: 'Calculadora científica Casio fx-991', fecha: '2026-10-14', foto: crearFoto('🧮', '#e0f2fe'), correoDeQuienEncontro: 'maria.vargas@ucb.edu.bo' },
];

export function cargarDatosDeEjemplo(repositorio) {
  if (repositorio.obtenerTodos().length > 0) {
    return;
  }
  OBJETOS_DE_EJEMPLO.forEach((objeto) => repositorio.guardar(objeto));
}