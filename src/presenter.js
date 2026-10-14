import { registrarUsuario } from './registro.js';

const correosRegistrados = [];

export function procesarRegistro(datos) {
  const resultado = registrarUsuario(datos, correosRegistrados);
  if (resultado.exito) {
    correosRegistrados.push(datos.correo);
  }
  return resultado;
}