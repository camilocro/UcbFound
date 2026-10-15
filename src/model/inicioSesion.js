export const MENSAJES_LOGIN = {
  CAMPOS_VACIOS: 'Por favor, ingrese correo y contraseña',
};

// Aplica las reglas de la HU-02 para iniciar sesión
export class InicioSesion {
  constructor(usuariosRegistrados = []) {
    this.usuariosRegistrados = usuariosRegistrados;
  }

  iniciar({ correo }) {
    if (correo.trim() === '') {
      return { exito: false, mensaje: MENSAJES_LOGIN.CAMPOS_VACIOS };
    }
  }
}