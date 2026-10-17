import { ReporteObjetoPerdido } from './reporteObjetoPerdido.js';

const HOY = '2026-10-17';
const CORREO = 'juan.perez@ucb.edu.bo';
const datosValidos = {
  nombre: 'Mochila negra',
  descripcion: 'Mochila con un llavero de la UCB',
  fecha: '2026-10-15',
};

describe('HU-04 Criterio 1: reporte creado', () => {
  it('debería crear el reporte cuando el nombre, la descripción y la fecha son válidos', () => {
    const resultado = new ReporteObjetoPerdido(HOY).reportar(datosValidos, CORREO);
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toEqual('Reporte creado correctamente');
  });
});

describe('HU-04 Criterio 1: reporte guardado a mi nombre', () => {
  it('debería crear el objeto perdido con el correo de quien lo reporta', () => {
    const resultado = new ReporteObjetoPerdido(HOY).reportar(datosValidos, CORREO);
    expect(resultado.objeto).toEqual({
      nombre: 'Mochila negra',
      descripcion: 'Mochila con un llavero de la UCB',
      fecha: '2026-10-15',
      correoDelDueno: 'juan.perez@ucb.edu.bo',
    });
  });
});

describe('HU-04 Criterio 2: nombre o fecha vacíos', () => {
  it('debería pedir nombre y fecha cuando el nombre está vacío', () => {
    const resultado = new ReporteObjetoPerdido(HOY).reportar({ ...datosValidos, nombre: '' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario ingresar nombre y fecha' });
  });
});

describe('HU-04 Criterio 2: nombre o fecha vacíos', () => {
  it('debería pedir nombre y fecha cuando la fecha está vacía', () => {
    const resultado = new ReporteObjetoPerdido(HOY).reportar({ ...datosValidos, fecha: '' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario ingresar nombre y fecha' });
  });
});

describe('HU-04 Criterio 2: nombre o fecha vacíos', () => {
  it('debería pedir nombre y fecha cuando el nombre solo tiene espacios', () => {
    const resultado = new ReporteObjetoPerdido(HOY).reportar({ ...datosValidos, nombre: '   ' }, CORREO);
    expect(resultado).toEqual({ exito: false, mensaje: 'Es necesario ingresar nombre y fecha' });
  });
});