const CLAVE_SESION = 'ucbfound_sesion';

// Guarda quién tiene la sesión iniciada
export class Sesion {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  estaIniciada() {
    return this.obtenerUsuario() !== null;
  }

  iniciar(usuario) {
    this.almacenamiento.setItem(CLAVE_SESION, JSON.stringify(usuario));
  }

  obtenerUsuario() {
    const datos = this.almacenamiento.getItem(CLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
  }
}