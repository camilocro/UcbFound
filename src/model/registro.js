import { Usuario } from './usuario.js';

export const MENSAJES = {
  CUENTA_CREADA: 'Cuenta creada correctamente',
  CAMPOS_VACIOS: 'Por favor, complete todos los campos',
  CORREO_NO_UCB: 'Solo se permiten correos @ucb.edu.bo',
  CONTRASENA_CORTA: 'La contraseña debe tener al menos 8 caracteres',
  CORREO_REPETIDO: 'Este correo ya está registrado',
};

// Aplica las reglas de la HU-01 para registrar un usuario nuevo
export class RegistroUsuario {
  constructor(correosRegistrados = []) {
    this.correosRegistrados = correosRegistrados;
  }

  registrar({ nombre, correo, contrasena }) {
    const usuario = new Usuario(nombre, correo, contrasena);
    if (usuario.tieneCamposVacios()) {
      return this.crearError(MENSAJES.CAMPOS_VACIOS);
    }
    if (!usuario.tieneCorreoUcb()) {
      return this.crearError(MENSAJES.CORREO_NO_UCB);
    }
    if (!usuario.tieneContrasenaValida()) {
      return this.crearError(MENSAJES.CONTRASENA_CORTA);
    }
    if (this.correoYaRegistrado(usuario.correo)) {
      return this.crearError(MENSAJES.CORREO_REPETIDO);
    }
    return { exito: true, mensaje: MENSAJES.CUENTA_CREADA, usuario };
  }

  correoYaRegistrado(correo) {
    return this.correosRegistrados.includes(correo);
  }

  crearError(mensaje) {
    return { exito: false, mensaje };
  }
}

export function registrarUsuario(datos, correosRegistrados = []) {
  return new RegistroUsuario(correosRegistrados).registrar(datos);
}