import { RegistroObjetoEncontrado } from './registroObjetoEncontrado.js';

const HOY = '2026-10-17';
const CORREO = 'camilo.rojas@ucb.edu.bo';
const FOTO = 'data:image/jpeg;base64,AAA';
const datosValidos = {
  nombre: 'Billetera café',
  descripcion: 'Tiene un carnet de la UCB adentro',
  foto: FOTO,
};
const registro = new RegistroObjetoEncontrado(HOY, () => 'obj-1');

describe('HU-11 Criterio 1: objeto registrado', () => {
  it('debería registrar el objeto cuando tiene foto y descripción', () => {
    const resultado = registro.registrar(datosValidos, CORREO);
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toEqual('Objeto registrado correctamente');
  });
});