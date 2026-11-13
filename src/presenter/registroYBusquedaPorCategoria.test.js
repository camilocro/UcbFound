import { RegistroObjetoPresenter } from './registroObjetoPresenter.js';
import { BusquedaPresenter } from './busquedaPresenter.js';
import { RepositorioObjetosEncontrados } from '../model/repositorioObjetosEncontrados.js';
import { Sesion } from '../model/sesion.js';
import { BLOQUES } from '../model/bloques.js';

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

function crearRepositorioConLlavesRegistradas() {
  const repositorio = new RepositorioObjetosEncontrados(crearAlmacenamientoFalso());
  const sesion = new Sesion(crearAlmacenamientoFalso());
  sesion.iniciar({ nombre: 'Camilo Rojas', correo: 'camilo.rojas@ucb.edu.bo' });
  const registro = new RegistroObjetoPresenter(repositorio, sesion, () => new Date(2026, 9, 17), () => 'obj-1');
  registro.registrar({
    nombre: 'Llaves del casillero',
    descripcion: 'Llavero rojo con una etiqueta',
    foto: 'data:image/jpeg;base64,AAA',
    categoria: 'Llaves',
    bloque: BLOQUES[0],
    aula: 'Aula 201',
  });
  return repositorio;
}

describe('Integración HU-12, HU-13 y HU-08: registrar y buscar por categoría', () => {
  it('debería encontrar por su categoría el objeto recién registrado con categoría y lugar', () => {
    const repositorio = crearRepositorioConLlavesRegistradas();
    const resultado = new BusquedaPresenter(repositorio).buscar('', 'Llaves');
    expect(resultado.objetos.map((objeto) => objeto.nombre)).toEqual(['Llaves del casillero']);
  });
});