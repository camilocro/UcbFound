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

describe('HU-03 Criterio 1: cerrar sesión', () => {
  it('debería terminar la sesión al cerrarla', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    sesion.iniciar(usuario);
    sesion.cerrar();
    expect(sesion.estaIniciada()).toBe(false);
  });
});

describe('HU-03 Criterio 2: páginas que requieren cuenta', () => {
  it('debería pedir iniciar sesión al abrir una página que requiere cuenta sin sesión', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    expect(sesion.resolverPagina('principal')).toEqual('inicio-sesion');
  });
});

describe('HU-03 Criterio 2: páginas que requieren cuenta', () => {
  it('debería mostrar la página que requiere cuenta cuando hay sesión', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    sesion.iniciar(usuario);
    expect(sesion.resolverPagina('principal')).toEqual('principal');
  });
});

describe('HU-03 Criterio 2: páginas públicas', () => {
  it('debería mostrar la página de registro aunque no haya sesión', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    expect(sesion.resolverPagina('registro')).toEqual('registro');
  });
});
describe('HU-11 Páginas que requieren cuenta', () => {
  it('debería pedir iniciar sesión para registrar un objeto encontrado', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    expect(sesion.resolverPagina('registrar-objeto')).toEqual('inicio-sesion');
  });
});

describe('HU-07 Páginas que requieren cuenta', () => {
  it('debería pedir iniciar sesión para buscar objetos encontrados', () => {
    const sesion = new Sesion(crearAlmacenamientoFalso());
    expect(sesion.resolverPagina('buscar-objetos')).toEqual('inicio-sesion');
  });
});