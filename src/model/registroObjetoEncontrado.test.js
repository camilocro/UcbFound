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

describe('HU-11 Criterio 1: objeto a nombre de quien lo encontró', () => {
  it('debería crear el objeto con la fecha de hoy y el correo de quien lo encontró', () => {
    const resultado = registro.registrar(datosValidos, CORREO);
    expect(resultado.objeto).toEqual({
      id: 'obj-1',
      nombre: 'Billetera café',
      descripcion: 'Tiene un carnet de la UCB adentro',
      fecha: '2026-10-17',
      foto: FOTO,
      correoDeQuienEncontro: 'camilo.rojas@ucb.edu.bo',
    });
  });
});

describe('HU-11 Criterio 2: sin foto', () => {
  it('debería pedir foto y descripción cuando falta la foto', () => {
    const resultado = registro.registrar({ ...datosValidos, foto: '' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario agregar una foto y una descripción' });
  });
});

describe('HU-11 Criterio 2: sin descripción', () => {
  it('debería pedir foto y descripción cuando falta la descripción', () => {
    const resultado = registro.registrar({ ...datosValidos, descripcion: '' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario agregar una foto y una descripción' });
  });
});

describe('HU-11 Criterio 2: descripción con solo espacios', () => {
  it('debería tratar como vacía una descripción con solo espacios', () => {
    const resultado = registro.registrar({ ...datosValidos, descripcion: '   ' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario agregar una foto y una descripción' });
  });
});

describe('HU-11 Nombre opcional', () => {
  it('debería usar "Objeto encontrado" como nombre cuando no se escribe uno', () => {
    const resultado = registro.registrar({ ...datosValidos, nombre: '' }, CORREO);
    expect(resultado.objeto.nombre).toEqual('Objeto encontrado');
  });
});