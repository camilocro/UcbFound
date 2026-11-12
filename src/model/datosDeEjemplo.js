const PREFIJO_FOTO_ANTIGUA = 'data:image/svg+xml';
const crearUrlDeFoto = (nombreDeArchivo) => `https://commons.wikimedia.org/wiki/Special:FilePath/${nombreDeArchivo}?width=400`;

export const OBJETOS_DE_EJEMPLO = [
  { id: 'ejemplo-1', bloque: 'Tupuraya 1 - Biblioteca', categoria: 'Mochilas y bolsos', nombre: 'Mochila negra', descripcion: 'Mochila con un llavero de la UCB y cuadernos adentro', fecha: '2026-10-06', foto: crearUrlDeFoto('QWSTION_BACKPACK_WASHED-BLACK_Front.jpg'), correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' },
  { id: 'ejemplo-2', bloque: 'Tupuraya 2 - Bloque A', aula: 'A-204', categoria: 'Electrónica', nombre: 'Cargador de laptop', descripcion: 'Cargador marca HP con cable negro', fecha: '2026-10-08', foto: crearUrlDeFoto('Ac_adapter.jpg'), correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' },
  { id: 'ejemplo-3', bloque: 'Tupuraya 2 - Canchas', categoria: 'Botellas y termos', nombre: 'Botella de agua', descripcion: 'Botella azul de metal con stickers', fecha: '2026-10-09', foto: crearUrlDeFoto('Niksun_stainless_steel_water_bottle.jpg'), correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' },
  { id: 'ejemplo-4', bloque: 'Tupuraya 2 - Bloque C', aula: 'C-101', categoria: 'Electrónica', nombre: 'Audífonos', descripcion: 'Audífonos inalámbricos blancos en su estuche', fecha: '2026-10-11', foto: crearUrlDeFoto('Pixel_Buds_in_charging_case_with_product_box.jpg'), correoDeQuienEncontro: 'maria.vargas@ucb.edu.bo' },
  { id: 'ejemplo-5', bloque: 'Tupuraya 2 - Parqueo', categoria: 'Llaves', nombre: 'Llaves', descripcion: 'Llavero con tres llaves y un destapador', fecha: '2026-10-13', foto: crearUrlDeFoto('Keychain.jpg'), correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' },
  { id: 'ejemplo-6', bloque: 'Tupuraya 1 - Bloque B', aula: 'B-305', categoria: 'Electrónica', nombre: 'Calculadora', descripcion: 'Calculadora científica Casio fx-991', fecha: '2026-10-14', foto: crearUrlDeFoto('Casio_fx-991ES_Calculator.jpg'), correoDeQuienEncontro: 'maria.vargas@ucb.edu.bo' },
];

function tieneFotoAntigua(objeto) {
  return objeto.foto.startsWith(PREFIJO_FOTO_ANTIGUA);
}

function completarEjemploGuardado(objetoGuardado, objetoDeEjemplo) {
  return {
    ...objetoGuardado,
    foto: tieneFotoAntigua(objetoGuardado) ? objetoDeEjemplo.foto : objetoGuardado.foto,
    categoria: objetoGuardado.categoria || objetoDeEjemplo.categoria,
  };
}

export function cargarDatosDeEjemplo(repositorio) {
  const objetosGuardados = repositorio.obtenerTodos();
  if (objetosGuardados.length === 0) {
    OBJETOS_DE_EJEMPLO.forEach((objeto) => repositorio.guardar(objeto));
    return;
  }
  OBJETOS_DE_EJEMPLO.forEach((objetoDeEjemplo) => {
    const objetoGuardado = objetosGuardados.find((objeto) => objeto.id === objetoDeEjemplo.id);
    if (objetoGuardado) {
      repositorio.actualizar(completarEjemploGuardado(objetoGuardado, objetoDeEjemplo));
    }
  });
}