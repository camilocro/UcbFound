import { SesionPresenter } from './sesionPresenter.js';
import { Sesion } from '../model/sesion.js';

// Almacenamiento falso que funciona igual que sessionStorage
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

const usuario = { nombre: 'Juan Pérez', correo: 'juan.perez@ucb.edu.bo' };

describe('HU-03 Presenter Criterio 1: cerrar sesión', () => {
  it('debería cerrar la sesión y llevar a la pantalla de ingreso', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    sesion.iniciar(usuario);
    const presenter = new SesionPresenter(sesion);
    expect(presenter.cerrarSesion()).toEqual('inicio-sesion');
    expect(sesion.estaIniciada()).toBe(false);
  });
});