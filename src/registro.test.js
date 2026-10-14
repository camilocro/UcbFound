import { registrarUsuario } from './registro.js';

const datosValidos = {
  nombre: 'Juan Pérez',
  correo: 'juan.perez@ucb.edu.bo',
  contrasena: 'clave1234',
};

describe('HU-01 Criterio 1: crear cuenta con datos válidos', () => {
  it('debería crear la cuenta cuando el nombre, el correo @ucb.edu.bo y la contraseña son válidos', () => {
    const resultado = registrarUsuario(datosValidos);
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toEqual('Cuenta creada correctamente');
  });
});

describe('HU-01 Criterio 4: campos vacíos', () => {
  it('debería pedir completar los campos cuando el nombre está vacío', () => {
    const resultado = registrarUsuario({ ...datosValidos, nombre: '' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Por favor, complete todos los campos' });
  });
});

describe('HU-01 Criterio 4: campos vacíos', () => {
  it('debería pedir completar los campos cuando el correo está vacío', () => {
    const resultado = registrarUsuario({ ...datosValidos, correo: '' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Por favor, complete todos los campos' });
  });
});

describe('HU-01 Criterio 4: campos vacíos', () => {
  it('debería pedir completar los campos cuando la contraseña está vacía', () => {
    const resultado = registrarUsuario({ ...datosValidos, contrasena: '' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Por favor, complete todos los campos' });
  });
});

describe('HU-01 Criterio 4: campos vacíos', () => {
  it('debería pedir completar los campos cuando el nombre solo tiene espacios', () => {
    const resultado = registrarUsuario({ ...datosValidos, nombre: '   ' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Por favor, complete todos los campos' });
  });
});