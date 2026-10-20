import { RegistroPresenter } from './registroPresenter.js';
import { InicioSesionPresenter } from './inicioSesionPresenter.js';
import { RepositorioUsuarios } from '../model/repositorioUsuarios.js';

function crearAlmacenamientoFalso() {
  const datos = {};
  return {
    getItem: (clave) => (clave in datos ? datos[clave] : null),
    setItem: (clave, valor) => {
      datos[clave] = String(valor);
    },
    removeItem: (clave) => {
      delete datos[clave];
    },
  };
}

describe('Integración HU-01 y HU-02: registrarse y entrar', () => {
  it('debería iniciar sesión con la cuenta que se acaba de crear', () => {
    const repositorio = new RepositorioUsuarios(crearAlmacenamientoFalso());
    new RegistroPresenter(repositorio).procesarRegistro({ nombre: 'Juan Pérez', correo: 'Juan.Perez@ucb.edu.bo', contrasena: 'clave1234' });
    const resultado = new InicioSesionPresenter(repositorio).procesarInicioSesion({ correo: 'juan.perez@ucb.edu.bo', contrasena: 'clave1234' });
    expect(resultado).toEqual({ exito: true, usuario: { nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo' } });
  });
});