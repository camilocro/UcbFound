const CLAVE = 'ucbfound_objetos_encontrados';

export class RepositorioObjetosEncontrados {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerTodos() {
    const datos = this.almacenamiento.getItem(CLAVE);
    return datos ? JSON.parse(datos) : [];
  }
}