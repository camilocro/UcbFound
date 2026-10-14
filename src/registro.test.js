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

describe('HU-01 Criterio 2: solo correos @ucb.edu.bo', () => {
  it('debería rechazar un correo que no termina en @ucb.edu.bo', () => {
    const resultado = registrarUsuario({ ...datosValidos, correo: 'juan.perez@gmail.com' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Solo se permiten correos @ucb.edu.bo' });
  });
});

describe('HU-01 Criterio 2: solo correos @ucb.edu.bo', () => {
  it('debería rechazar un correo sin nombre antes de @ucb.edu.bo', () => {
    const resultado = registrarUsuario({ ...datosValidos, correo: '@ucb.edu.bo' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Solo se permiten correos @ucb.edu.bo' });
  });
});

describe('HU-01 Criterio 1: contraseña de mínimo 8 caracteres', () => {
  it('debería rechazar una contraseña de menos de 8 caracteres', () => {
    const resultado = registrarUsuario({ ...datosValidos, contrasena: '1234567' });
    expect(resultado).toEqual({ exito: false, mensaje: 'La contraseña debe tener al menos 8 caracteres' });
  });
});

describe('HU-01 Criterio 3: correo ya registrado', () => {
  it('debería avisar que el correo ya está registrado', () => {
    const resultado = registrarUsuario(datosValidos, ['juan.perez@ucb.edu.bo']);
    expect(resultado).toEqual({ exito: false, mensaje: 'Este correo ya está registrado' });
  });
});

describe('HU-01 Criterio 3: correo ya registrado', () => {
  it('debería detectar el correo registrado aunque esté con mayúsculas y espacios', () => {
    const resultado = registrarUsuario({ ...datosValidos, correo: '  JUAN.PEREZ@UCB.EDU.BO ' }, ['juan.perez@ucb.edu.bo']);
    expect(resultado).toEqual({ exito: false, mensaje: 'Este correo ya está registrado' });
  });
});