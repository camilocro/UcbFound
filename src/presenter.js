import { registrarUsuario } from './registro.js';
import { RepositorioUsuarios } from './repositorioUsuarios.js';

const repositorio = new RepositorioUsuarios(window.localStorage);

export function procesarRegistro(datos) {
  const resultado = registrarUsuario(datos, repositorio.obtenerCorreos());
  if (resultado.exito) {
    repositorio.guardar({
      nombre: datos.nombre,
      correo: datos.correo,
      contrasena: datos.contrasena,
    });
  }
  return resultado;
}