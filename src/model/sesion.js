const CLAVE_SESION = 'ucbfound_sesion';
const PAGINAS_CON_CUENTA = ['principal', 'reportar-objeto'];

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

  cerrar() {
    this.almacenamiento.removeItem(CLAVE_SESION);
  }

  resolverPagina(pagina) {
    if (PAGINAS_CON_CUENTA.includes(pagina) && !this.estaIniciada()) {
      return 'inicio-sesion';
    }
    return pagina;
  }
}