export const MENSAJES = {
  CUENTA_CREADA: 'Cuenta creada correctamente',
};

export function registrarUsuario() {
  return { exito: true, mensaje: MENSAJES.CUENTA_CREADA };
}