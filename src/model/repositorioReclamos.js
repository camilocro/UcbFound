import { Reclamo } from './reclamo.js';

const CLAVE_RECLAMOS = 'ucbfound_reclamos';

export class RepositorioReclamos {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerTodos() {
    const textoGuardado = this.almacenamiento.getItem(CLAVE_RECLAMOS);
    const reclamos = textoGuardado ? JSON.parse(textoGuardado) : [];
    return reclamos.map((reclamo) => new Reclamo(reclamo));
  }

  guardar(reclamo) {
    const reclamos = this.obtenerTodos();
    reclamos.push(reclamo);
    this.almacenamiento.setItem(CLAVE_RECLAMOS, JSON.stringify(reclamos));
  }
}