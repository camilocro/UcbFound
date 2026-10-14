export const MENSAJES = {
  CUENTA_CREADA: 'Cuenta creada correctamente',
  CAMPOS_VACIOS: 'Por favor, complete todos los campos',
  CORREO_NO_UCB: 'Solo se permiten correos @ucb.edu.bo',
};

const DOMINIO_UCB = '@ucb.edu.bo';

export function hayCamposVacios({ nombre, correo, contrasena }) {
  return [nombre, correo, contrasena].some((campo) => campo.trim() === '');
}

export function esCorreoUcb(correo) {
  const usuario = correo.slice(0, -DOMINIO_UCB.length);
  return correo.endsWith(DOMINIO_UCB) && usuario.length > 0 && !/[\s@]/.test(usuario);
}

function crearError(mensaje) {
  return { exito: false, mensaje };
}

export function registrarUsuario(datos) {
  if (hayCamposVacios(datos)) {
    return crearError(MENSAJES.CAMPOS_VACIOS);
  }
  if (!esCorreoUcb(datos.correo)) {
    return crearError(MENSAJES.CORREO_NO_UCB);
  }
  return { exito: true, mensaje: MENSAJES.CUENTA_CREADA };
}