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