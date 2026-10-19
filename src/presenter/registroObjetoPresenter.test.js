import { RegistroObjetoPresenter } from './registroObjetoPresenter.js';
import { BusquedaPresenter } from './busquedaPresenter.js';
import { RepositorioObjetosEncontrados } from '../model/repositorioObjetosEncontrados.js';
import { Sesion } from '../model/sesion.js';

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

const FOTO = 'data:image/jpeg;base64,AAA';
const datosValidos = { nombre: 'Billetera café', descripcion: 'Tiene un carnet de la UCB adentro', foto: FOTO };

function crearPresenter(repositorio) {
  const sesion = new Sesion(crearAlmacenamientoFalso());
  sesion.iniciar({ nombre: 'Camilo Rojas', correo: 'camilo.rojas@ucb.edu.bo' });
  return new RegistroObjetoPresenter(repositorio, sesion, () => new Date(2026, 9, 17), () => 'obj-1');
}

describe('HU-11 Presenter Criterio 1: aparece en la lista', () => {
  it('debería mostrar el objeto registrado en la lista de objetos encontrados', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    crearPresenter(repositorio).registrar(datosValidos);
    expect(new BusquedaPresenter(repositorio).buscar('').objetos).toEqual([
      { id: 'obj-1', foto: FOTO, nombre: 'Billetera café', descripcion: 'Tiene un carnet de la UCB adentro', fecha: '2026-10-17' },
    ]);
  });
});
describe('HU-11 Presenter Criterio 2: no guardar sin datos', () => {
  it('no debería guardar el objeto cuando falta la foto', () => {
    const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
    crearPresenter(repositorio).registrar({ ...datosValidos, foto: '' });
    expect(repositorio.obtenerTodos()).toEqual([]);
  });
});
describe('HU-11 Presenter: foto muy pesada', () => {
  it('debería avisar cuando el navegador no tiene espacio para guardar la foto', () => {
    const almacenamientoLleno = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
      removeItem: () => {},
    };
    const repositorio = new RepositorioObjetosEncontrados(almacenamientoLleno);
    expect(crearPresenter(repositorio).registrar(datosValidos)).toEqual({
      exito: false,
      mensaje: 'La foto es muy pesada, prueba con una imagen más pequeña',
    });
  });
});