export const MENSAJES = {
  CUENTA_CREADA: 'Cuenta creada correctamente',
  CAMPOS_VACIOS: 'Por favor, complete todos los campos',
};

export function hayCamposVacios(datos) {
  return datos.nombre === '';
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