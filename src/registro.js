export const MENSAJES = {
  CUENTA_CREADA: 'Cuenta creada correctamente',
  CAMPOS_VACIOS: 'Por favor, complete todos los campos',
};

export function hayCamposVacios({ nombre, correo, contrasena }) {
  return [nombre, correo, contrasena].some((campo) => campo === '');
}

function crearError(mensaje) {
  return { exito: false, mensaje };
}

export function registrarUsuario(datos) {
  if (hayCamposVacios(datos)) {
    return crearError(MENSAJES.CAMPOS_VACIOS);
  }
  return { exito: true, mensaje: MENSAJES.CUENTA_CREADA };
}