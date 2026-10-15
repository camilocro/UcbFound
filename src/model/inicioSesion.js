export const MENSAJES_LOGIN = {
  CAMPOS_VACIOS: 'Por favor, ingrese correo y contraseña',
  CREDENCIALES_INVALIDAS: 'Correo o contraseña no son válidos',
};

// Aplica las reglas de la HU-02 para iniciar sesión
export class InicioSesion {
  constructor(usuariosRegistrados = []) {
    this.usuariosRegistrados = usuariosRegistrados;
  }

  iniciar({ correo, contrasena }) {
    if (correo.trim() === '' || contrasena.trim() === '') {
      return { exito: false, mensaje: MENSAJES_LOGIN.CAMPOS_VACIOS };
    }
    const usuario = this.usuariosRegistrados.find(
      (registrado) => registrado.correo === correo && registrado.contrasena === contrasena,
    );
    if (!usuario) {
      return { exito: false, mensaje: MENSAJES_LOGIN.CREDENCIALES_INVALIDAS };
    }
  }
}