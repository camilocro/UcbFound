export const MENSAJES = {
  CUENTA_CREADA: 'Cuenta creada correctamente',
  CAMPOS_VACIOS: 'Por favor, complete todos los campos',
  CORREO_NO_UCB: 'Solo se permiten correos @ucb.edu.bo',
  CONTRASENA_CORTA: 'La contraseña debe tener al menos 8 caracteres',
  CORREO_REPETIDO: 'Este correo ya está registrado',
};

const DOMINIO_UCB = '@ucb.edu.bo';
const LONGITUD_MINIMA_CONTRASENA = 8;

export function hayCamposVacios({ nombre, correo, contrasena }) {
  return [nombre, correo, contrasena].some((campo) => campo.trim() === '');
}

export function esCorreoUcb(correo) {
  const usuario = correo.slice(0, -DOMINIO_UCB.length);
  return correo.endsWith(DOMINIO_UCB) && usuario.length > 0 && !/[\s@]/.test(usuario);
}

export function esContrasenaValida(contrasena) {
  return contrasena.length >= LONGITUD_MINIMA_CONTRASENA;
}

export function normalizarCorreo(correo) {
  return correo.trim().toLowerCase();
}

function crearError(mensaje) {
  return { exito: false, mensaje };
}

export function registrarUsuario(datos, correosRegistrados = []) {
  if (hayCamposVacios(datos)) {
    return crearError(MENSAJES.CAMPOS_VACIOS);
  }
  const correo = normalizarCorreo(datos.correo);
  if (!esCorreoUcb(correo)) {
    return crearError(MENSAJES.CORREO_NO_UCB);
  }
  if (!esContrasenaValida(datos.contrasena)) {
    return crearError(MENSAJES.CONTRASENA_CORTA);
  }
  if (correosRegistrados.includes(correo)) {
    return crearError(MENSAJES.CORREO_REPETIDO);
  }
  return { exito: true, mensaje: MENSAJES.CUENTA_CREADA };
}