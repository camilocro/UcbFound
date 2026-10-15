import { InicioSesion } from './inicioSesion.js';

const usuarios = [
  { nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo', contrasena: 'clave1234' },
];

describe('HU-02 Criterio 1: inicio de sesión correcto', () => {
  it('debería iniciar sesión cuando el correo y la contraseña existen', () => {
    const inicioSesion = new InicioSesion(usuarios);
    const resultado = inicioSesion.iniciar({ correo: 'juan.perez@ucb.edu.bo', contrasena: 'clave1234' });
    expect(resultado).toEqual({
      exito: true,
      usuario: { nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo' },
    });
  });
});

describe('HU-02 Criterio 2: credenciales incorrectas', () => {
  it('debería avisar que los datos no son válidos cuando la contraseña es incorrecta', () => {
    const inicioSesion = new InicioSesion(usuarios);
    const resultado = inicioSesion.iniciar({ correo: 'juan.perez@ucb.edu.bo', contrasena: 'otraClave99' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Correo o contraseña no son válidos' });
  });
});

describe('HU-02 Criterio 3: campos vacíos', () => {
  it('debería pedir correo y contraseña cuando el correo está vacío', () => {
    const inicioSesion = new InicioSesion([]);
    const resultado = inicioSesion.iniciar({ correo: '', contrasena: 'clave1234' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Por favor, ingrese correo y contraseña' });
  });

  it('debería pedir correo y contraseña cuando la contraseña está vacía', () => {
    const inicioSesion = new InicioSesion([]);
    const resultado = inicioSesion.iniciar({ correo: 'juan.perez@ucb.edu.bo', contrasena: '' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Por favor, ingrese correo y contraseña' });
  });
});