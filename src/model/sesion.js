const CLAVE_SESION = 'ucbfound_sesion';
import { esEncargado } from './encargado.js';
const PAGINAS_CON_CUENTA = ['principal', 'reportar-objeto', 'registrar-objeto', 'buscar-objetos', 'objetos-guardados'];
const PAGINAS_DEL_ENCARGADO = ['objetos-guardados'];
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
    const textoGuardado = this.almacenamiento.getItem(CLAVE_SESION);
    return textoGuardado ? JSON.parse(textoGuardado) : null;
  }

  cerrar() {
    this.almacenamiento.removeItem(CLAVE_SESION);
  }

    esEncargado() {
        const usuario = this.obtenerUsuario();
    return usuario !== null && esEncargado(usuario.correo);
  }

  resolverPagina(pagina) {
    if (PAGINAS_CON_CUENTA.includes(pagina) && !this.estaIniciada()) {
           return 'inicio-sesion';
    }
    if (PAGINAS_DEL_ENCARGADO.includes(pagina) && !this.esEncargado()) {
      return 'principal';
    }
    return pagina;
  }
}