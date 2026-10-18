import { ObjetoEncontrado } from './objetoEncontrado.js';

const CLAVE = 'ucbfound_objetos_encontrados';

export class RepositorioObjetosEncontrados {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerTodos() {
    const datos = this.almacenamiento.getItem(CLAVE);
    const lista = datos ? JSON.parse(datos) : [];
    return lista.map((objeto) => new ObjetoEncontrado(objeto));
  }

  guardar(objeto) {
    const lista = this.obtenerTodos();
    lista.push(objeto);
    this.almacenamiento.setItem(CLAVE, JSON.stringify(lista));
  }

  buscarPorId(id) {
    return this.obtenerTodos().find((objeto) => objeto.id === id);
  }
}