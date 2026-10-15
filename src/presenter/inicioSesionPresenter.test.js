import { InicioSesionPresenter } from './inicioSesionPresenter.js';

// Repositorio falso: devuelve los usuarios como si estuvieran guardados
function crearRepositorioFalso(usuarios) {
  return { obtenerUsuarios: () => usuarios };
}

const usuarios = [
  { nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo', contrasena: 'clave1234' },
];

describe('HU-02 Presenter: inicio de sesión', () => {
  it('debería iniciar sesión con un usuario guardado en el repositorio', () => {
    const presenter = new InicioSesionPresenter(crearRepositorioFalso(usuarios));
    const resultado = presenter.procesarInicioSesion({ correo: 'juan.perez@ucb.edu.bo', contrasena: 'clave1234' });
    expect(resultado).toEqual({
      exito: true,
      usuario: { nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo' },
    });
  });
});