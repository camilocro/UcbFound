import { ObjetoEncontrado } from './objetoEncontrado.js';

const CLAVE_OBJETOS_ENCONTRADOS = 'ucbfound_objetos_encontrados';

export class RepositorioObjetosEncontrados {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerTodos() {
    const textoGuardado = this.almacenamiento.getItem(CLAVE_OBJETOS_ENCONTRADOS);
    const objetos = textoGuardado ? JSON.parse(textoGuardado) : [];
    return objetos.map((objeto) => new ObjetoEncontrado(objeto));
  }

  guardar(objeto) {
    const objetos = this.obtenerTodos();
    objetos.push(objeto);
    this.almacenamiento.setItem(CLAVE_OBJETOS_ENCONTRADOS, JSON.stringify(objetos));
  }

  actualizar(objeto) {
    const objetos = this.obtenerTodos().map((objetoGuardado) => (objetoGuardado.id === objeto.id ? objeto : objetoGuardado));
    this.almacenamiento.setItem(CLAVE_OBJETOS_ENCONTRADOS, JSON.stringify(objetos));
  }

  buscarPorId(id) {
    return this.obtenerTodos().find((objeto) => objeto.id === id);
  }
}