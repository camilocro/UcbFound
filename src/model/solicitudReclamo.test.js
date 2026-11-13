import { SolicitudReclamo } from './solicitudReclamo.js';
import { OBJETOS_DE_EJEMPLO } from './datosDeEjemplo.js';

const FECHA_DE_HOY = '2026-11-12';
const CORREO_DE_QUIEN_RECLAMA = 'majo.sandoval@ucb.edu.bo';
const [mochilaEncontrada] = OBJETOS_DE_EJEMPLO;
const solicitudValida = {
  objeto: mochilaEncontrada,
  explicacion: 'Es mía, adentro está mi carnet universitario',
};
const reglasDeReclamo = new SolicitudReclamo(FECHA_DE_HOY, () => 'reclamo-1');

describe('HU-10 Criterio 3: solicitud enviada', () => {
  it('debería guardar la solicitud como pendiente a nombre de quien reclama', () => {
    const resultado = reglasDeReclamo.crearReclamo(
      solicitudValida,
      CORREO_DE_QUIEN_RECLAMA,
    );
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toEqual('Solicitud enviada. Un encargado la revisará');
    expect(resultado.reclamo).toEqual({
      id: 'reclamo-1',
      idObjeto: 'ejemplo-1',
      correoDelReclamante: 'majo.sandoval@ucb.edu.bo',
      explicacion: 'Es mía, adentro está mi carnet universitario',
      fecha: '2026-11-12',
      estado: 'pendiente',
    });
  });
});

describe('HU-10 Criterio 4: explicación vacía', () => {
  it('debería pedir la explicación cuando está vacía', () => {
    const resultado = reglasDeReclamo.crearReclamo(
      { ...solicitudValida, explicacion: '' },
      CORREO_DE_QUIEN_RECLAMA,
    );
    expect(resultado).toEqual({
      exito: false,
      mensaje: 'Es necesario explicar por qué el objeto es tuyo',
    });
  });

  it('debería tratar como vacía una explicación con solo espacios', () => {
    const resultado = reglasDeReclamo.crearReclamo(
      { ...solicitudValida, explicacion: '   ' },
      CORREO_DE_QUIEN_RECLAMA,
    );
    expect(resultado).toEqual({
      exito: false,
      mensaje: 'Es necesario explicar por qué el objeto es tuyo',
    });
  });
});

describe('HU-10 Criterio 6: objeto registrado por mí', () => {
  it('no debería dejar reclamar un objeto que registró la misma persona', () => {
    const resultado = reglasDeReclamo.crearReclamo(
      solicitudValida,
      'ana.lopez@ucb.edu.bo',
    );
    expect(resultado).toEqual({
      exito: false,
      mensaje: 'No puedes reclamar un objeto que tú registraste',
    });
  });
});

describe('HU-10 Criterio 5: solicitud repetida', () => {
  it('no debería dejar enviar otra solicitud sobre el mismo objeto', () => {
    const reclamoAnterior = reglasDeReclamo.crearReclamo(
      solicitudValida,
      CORREO_DE_QUIEN_RECLAMA,
    ).reclamo;
    const resultado = reglasDeReclamo.crearReclamo(
      solicitudValida,
      CORREO_DE_QUIEN_RECLAMA,
      [reclamoAnterior],
    );
    expect(resultado).toEqual({
      exito: false,
      mensaje: 'Ya enviaste una solicitud para este objeto',
    });
  });
});