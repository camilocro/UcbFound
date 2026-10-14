import { RepositorioUsuarios } from './repositorioUsuarios.js';

// Almacenamiento falso que funciona igual que localStorage
function crearAlmacenamientoFalso() {
  const datos = {};
  return {
    getItem: (clave) => (clave in datos ? datos[clave] : null),
    setItem: (clave, valor) => {
      datos[clave] = String(valor);
    },
  };
}

describe('Repositorio de usuarios', () => {
  it('debería empezar sin usuarios registrados', () => {
    const repositorio = new RepositorioUsuarios(crearAlmacenamientoFalso());
    expect(repositorio.obtenerUsuarios()).toEqual([]);
  });
});

describe('Repositorio de usuarios: guardar', () => {
  it('debería guardar un usuario y devolver su correo', () => {
    const repositorio = new RepositorioUsuarios(crearAlmacenamientoFalso());
    repositorio.guardar({ nombre: 'Ana López', correo: 'ana.lopez@ucb.edu.bo', contrasena: 'clave1234' });
    expect(repositorio.obtenerCorreos()).toEqual(['ana.lopez@ucb.edu.bo']);
  });
});