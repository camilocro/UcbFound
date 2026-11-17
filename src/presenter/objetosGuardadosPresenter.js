import { ListaObjetosGuardados } from '../model/listaObjetosGuardados.js';
import { EntregaObjeto } from '../model/entregaObjeto.js';
import { convertirFechaYHoraATexto } from '../model/fecha.js';

export class ObjetosGuardadosPresenter {
  constructor(repositorio, sesion, obtenerFechaActual = () => new Date()) {
    this.repositorio = repositorio;
    this.sesion = sesion;
    this.obtenerFechaActual = obtenerFechaActual;
  }

  obtenerObjetosGuardados() {
    const resultado = new ListaObjetosGuardados(this.repositorio.obtenerTodos()).obtener();
    return {
      ...resultado,
      objetos: resultado.objetos.map((objeto) => objeto.obtenerVistaEncargado()),
    };
  }

  registrarEntrega(idObjeto, datos) {
    const encargado = this.sesion.obtenerUsuario();
    const objeto = this.repositorio.buscarPorId(idObjeto);
    const reglasDeEntrega = new EntregaObjeto(convertirFechaYHoraATexto(this.obtenerFechaActual()));
    const resultado = reglasDeEntrega.registrar(objeto, datos, encargado.correo);
    if (resultado.exito) {
      this.repositorio.actualizar(resultado.objeto);
    }
    return resultado;
  }
}