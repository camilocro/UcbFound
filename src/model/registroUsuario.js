import { Usuario } from './usuario.js';
import { crearError } from './resultado.js';

export const MENSAJES_REGISTRO = {
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
      return crearError(MENSAJES_REGISTRO.CAMPOS_VACIOS);
    }
    if (!usuario.tieneCorreoUcb()) {
      return crearError(MENSAJES_REGISTRO.CORREO_NO_UCB);
    }
    if (!usuario.tieneContrasenaValida()) {
      return crearError(MENSAJES_REGISTRO.CONTRASENA_CORTA);
    }
    if (this.estaRegistrado(usuario.correo)) {
      return crearError(MENSAJES_REGISTRO.CORREO_REPETIDO);
    }
    return { exito: true, mensaje: MENSAJES_REGISTRO.CUENTA_CREADA, usuario };
  }

  estaRegistrado(correo) {
    return this.correosRegistrados.includes(correo);
  }
}

export function registrarUsuario(datos, correosRegistrados = []) {
  return new RegistroUsuario(correosRegistrados).registrar(datos);
}