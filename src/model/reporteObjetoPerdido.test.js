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