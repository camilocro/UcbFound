import { registrarUsuario } from '../model/registro.js';
import { RepositorioUsuarios } from '../model/repositorioUsuarios.js';

const repositorio = new RepositorioUsuarios(window.localStorage);

export function procesarRegistro(datos) {
  const resultado = registrarUsuario(datos, repositorio.obtenerCorreos());
  if (resultado.exito) {
    repositorio.guardar(resultado.usuario);
  }
  return resultado;
}