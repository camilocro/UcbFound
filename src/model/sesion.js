const CLAVE_SESION = 'ucbfound_sesion';

// Guarda quién tiene la sesión iniciada
export class Sesion {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  estaIniciada() {
    return this.almacenamiento.getItem(CLAVE_SESION) !== null;
  }

  iniciar(usuario) {
    this.almacenamiento.setItem(CLAVE_SESION, JSON.stringify(usuario));
  }
}