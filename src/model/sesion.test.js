import { Sesion } from './sesion.js';

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

describe('HU-03 Sesión', () => {
  it('debería empezar sin sesión iniciada', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    expect(sesion.estaIniciada()).toBe(false);
  });
});

describe('HU-03 Sesión: iniciar', () => {
  it('debería quedar iniciada después de iniciar sesión', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    sesion.iniciar(usuario);
    expect(sesion.estaIniciada()).toBe(true);
  });
});

describe('HU-03 Sesión: usuario actual', () => {
  it('debería devolver el usuario que inició sesión', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    sesion.iniciar(usuario);
    expect(sesion.obtenerUsuario()).toEqual(usuario);
  });
});