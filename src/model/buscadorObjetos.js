export class BuscadorObjetos {
  constructor(objetos) {
    this.objetos = objetos;
  }

  buscar(texto) {
    const encontrados = this.objetos.filter((objeto) => objeto.coincideCon(texto));
    return { objetos: encontrados, mensaje: '' };
  }
}