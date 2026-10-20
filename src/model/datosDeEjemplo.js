const PREFIJO_FOTO_ANTIGUA = 'data:image/svg+xml';
const foto = (archivo) => `https://commons.wikimedia.org/wiki/Special:FilePath/${archivo}?width=400`;

export const OBJETOS_DE_EJEMPLO = [
  { id: 'ejemplo-1', nombre: 'Mochila negra', descripcion: 'Mochila con un llavero de la UCB y cuadernos adentro', fecha: '2026-10-06', foto: foto('QWSTION_BACKPACK_WASHED-BLACK_Front.jpg'), correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' },
  { id: 'ejemplo-2', nombre: 'Cargador de laptop', descripcion: 'Cargador marca HP con cable negro', fecha: '2026-10-08', foto: foto('Ac_adapter.jpg'), correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' },
  { id: 'ejemplo-3', nombre: 'Botella de agua', descripcion: 'Botella azul de metal con stickers', fecha: '2026-10-09', foto: foto('Niksun_stainless_steel_water_bottle.jpg'), correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' },
  { id: 'ejemplo-4', nombre: 'Audífonos', descripcion: 'Audífonos inalámbricos blancos en su estuche', fecha: '2026-10-11', foto: foto('Pixel_Buds_in_charging_case_with_product_box.jpg'), correoDeQuienEncontro: 'maria.vargas@ucb.edu.bo' },
  { id: 'ejemplo-5', nombre: 'Llaves', descripcion: 'Llavero con tres llaves y un destapador', fecha: '2026-10-13', foto: foto('Keychain.jpg'), correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' },
  { id: 'ejemplo-6', nombre: 'Calculadora', descripcion: 'Calculadora científica Casio fx-991', fecha: '2026-10-14', foto: foto('Casio_fx-991ES_Calculator.jpg'), correoDeQuienEncontro: 'maria.vargas@ucb.edu.bo' },
];

function tieneFotoAntigua(objeto) {
  return objeto.foto.startsWith(PREFIJO_FOTO_ANTIGUA);
}

export function cargarDatosDeEjemplo(repositorio) {
  const guardados = repositorio.obtenerTodos();
  if (guardados.length === 0) {
    OBJETOS_DE_EJEMPLO.forEach((objeto) => repositorio.guardar(objeto));
    return;
  }
  OBJETOS_DE_EJEMPLO.forEach((ejemplo) => {
    const guardado = guardados.find((objeto) => objeto.id === ejemplo.id);
    if (guardado && tieneFotoAntigua(guardado)) {
      repositorio.actualizar({ ...guardado, foto: ejemplo.foto });
    }
  });
}