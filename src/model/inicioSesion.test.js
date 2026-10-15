import { InicioSesion } from './inicioSesion.js';

describe('HU-02 Criterio 3: campos vacíos', () => {
  it('debería pedir correo y contraseña cuando el correo está vacío', () => {
    const inicioSesion = new InicioSesion([]);
    const resultado = inicioSesion.iniciar({ correo: '', contrasena: 'clave1234' });
    expect(resultado).toEqual({ exito: false, mensaje: 'Por favor, ingrese correo y contraseña' });
  });
});