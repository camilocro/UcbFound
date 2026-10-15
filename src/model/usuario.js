const DOMINIO_UCB = '@ucb.edu.bo';
const LONGITUD_MINIMA_CONTRASENA = 8;

// Representa a un usuario de UCBFound y sabe validar sus propios datos
export class Usuario {
  constructor(nombre, correo, contrasena) {
    this.nombre = nombre.trim();
    this.correo = correo.trim().toLowerCase();
    this.contrasena = contrasena;
  }

  tieneCamposVacios() {
    return [this.nombre, this.correo, this.contrasena].some((campo) => campo.trim() === '');
  }

  tieneCorreoUcb() {
    const nombreDeUsuario = this.correo.slice(0, -DOMINIO_UCB.length);
    return this.correo.endsWith(DOMINIO_UCB) && nombreDeUsuario.length > 0 && !/[\s@]/.test(nombreDeUsuario);
  }

  tieneContrasenaValida() {
    return this.contrasena.length >= LONGITUD_MINIMA_CONTRASENA;
  }
}