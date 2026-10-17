const CLAVE = 'ucbfound_objetos_perdidos';

export class RepositorioReportes {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerReportes() {
    const datos = this.almacenamiento.getItem(CLAVE);
    return datos ? JSON.parse(datos) : [];
  }
}