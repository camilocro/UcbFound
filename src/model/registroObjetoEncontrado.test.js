import { RegistroObjetoEncontrado } from './registroObjetoEncontrado.js';
import { BLOQUES } from './bloques.js';

const HOY = '2026-10-17';
const CORREO = 'camilo.rojas@ucb.edu.bo';
const FOTO = 'data:image/jpeg;base64,AAA';
const datosValidos = {
  categoria: 'Electrónica',
  nombre: 'Billetera café',
  descripcion: 'Tiene un carnet de la UCB adentro',
  foto: FOTO,
  bloque: BLOQUES[0],
  celular: '71234567',
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
      categoria: 'Electrónica',
      bloque: BLOQUES[0],
      aula: '',
      celular: '71234567',
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

describe('HU-11 Criterio 3: solo imágenes', () => {
  it('debería rechazar un archivo que no es una imagen', () => {
    const resultado = registro.registrar({ ...datosValidos, foto: 'data:application/pdf;base64,AAA' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Solo se permiten imágenes' });
  });
});
describe('HU-13 Criterio 3: categoría guardada', () => {
  it('debería guardar la categoría junto con el objeto', () => {
    const resultado = registro.registrar({ ...datosValidos, categoria: 'Electrónica' }, CORREO);
    expect(resultado.objeto.categoria).toEqual('Electrónica');
  });
});
describe('HU-13 Criterio 4: sin categoría', () => {
  it('debería pedir la categoría cuando no se elige una', () => {
    const resultado = registro.registrar({ ...datosValidos, categoria: '' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario elegir una categoría' });
  });
});
describe('HU-13 Categoría fuera de la lista', () => {
  it('debería pedir la categoría cuando no está en la lista de categorías', () => {
    const resultado = registro.registrar({ ...datosValidos, categoria: 'Mascotas' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario elegir una categoría' });
  });
});
describe('HU-12 Criterio 3: lugar guardado', () => {
  it('debería guardar el bloque y el aula junto con el objeto', () => {
    const resultado = registro.registrar({ ...datosValidos, bloque: BLOQUES[0], aula: 'Aula 201' }, CORREO);
    expect(resultado.exito).toBe(true);
    expect(resultado.objeto.bloque).toEqual(BLOQUES[0]);
    expect(resultado.objeto.aula).toEqual('Aula 201');
  });
});
describe('HU-12 Criterio 4: sin bloque', () => {
  it('debería pedir el bloque cuando no se elige uno', () => {
    const resultado = registro.registrar({ ...datosValidos, bloque: '' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario indicar el bloque donde lo encontraste' });
  });
});
describe('HU-12 Criterio 5: aula opcional', () => {
  it('debería registrar el objeto solo con el bloque cuando el aula está vacía', () => {
    const resultado = registro.registrar({ ...datosValidos, aula: '' }, CORREO);
    expect(resultado.exito).toBe(true);
    expect(resultado.objeto.aula).toEqual('');
  });
  it('debería guardar el aula sin espacios sobrantes', () => {
    const resultado = registro.registrar({ ...datosValidos, aula: '  Aula 201  ' }, CORREO);
    expect(resultado.objeto.aula).toEqual('Aula 201');
  });
});

describe('HU-20 Criterio 2: celular inválido', () => {
  it('debería pedir un celular válido cuando el número no tiene 8 dígitos', () => {
    const resultado = registro.registrar({ ...datosValidos, celular: '7123' }, CORREO);
    expect(resultado).toEqual({
      exito: false,
      mensaje: 'Ingrese un número de celular válido',
    });
  });
});
describe('HU-20 Criterio 3: celular opcional', () => {
  it('debería registrar el objeto cuando el celular está vacío', () => {
    const resultado = registro.registrar({ ...datosValidos, celular: '' }, CORREO);
    expect(resultado.mensaje).toEqual('Objeto registrado correctamente');
  });
});