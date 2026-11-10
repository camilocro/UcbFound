export const MENSAJES_INICIO_SESION = {
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
      return { exito: false, mensaje: MENSAJES_INICIO_SESION.CAMPOS_VACIOS };
    }
    const correoNormalizado = correo.trim().toLowerCase();
    const usuario = this.usuariosRegistrados.find(
      (usuarioRegistrado) => usuarioRegistrado.correo === correoNormalizado && usuarioRegistrado.contrasena === contrasena,
    );
    if (!usuario) {
      return { exito: false, mensaje: MENSAJES_INICIO_SESION.CREDENCIALES_INVALIDAS };
    }
    return { exito: true, usuario: { nombre: usuario.nombre, correo: usuario.correo } };
  }
}