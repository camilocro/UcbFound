import { EntregaObjeto } from './entregaObjeto.js';
import { ObjetoEncontrado } from './objetoEncontrado.js';

const CORREO_DEL_ENCARGADO = 'encargado.objetos@ucb.edu.bo';

const crearMochila = () => new ObjetoEncontrado({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-15', foto: '', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' });

describe('HU-15 Criterio 1: registrar quién recogió el objeto', () => {
  it('debería guardar el nombre, el carnet, la fecha y el encargado que lo entregó', () => {
    const resultado = new EntregaObjeto('2026-10-20').registrar(crearMochila(), { nombre: ' Juan Pérez ', carnet: '1234567' }, CORREO_DEL_ENCARGADO);
    expect(resultado.exito).toBe(true);
    expect(resultado.mensaje).toEqual('Entrega registrada correctamente');
    expect(resultado.objeto.recogida).toEqual({ nombre: 'Juan Pérez', carnet: '1234567', fecha: '2026-10-20', correoDelEncargado: CORREO_DEL_ENCARGADO });
    expect(resultado.objeto.fueRecogido()).toBe(true);
  });
});

describe('HU-15 Criterio 2: faltan datos de quien recoge', () => {
  it('debería pedir el nombre y el carnet de quien recoge', () => {
    const entrega = new EntregaObjeto('2026-10-20');
    const sinNombre = entrega.registrar(crearMochila(), { nombre: '  ', carnet: '1234567' }, CORREO_DEL_ENCARGADO);
    const sinCarnet = entrega.registrar(crearMochila(), { nombre: 'Juan Pérez', carnet: '' }, CORREO_DEL_ENCARGADO);
    expect(sinNombre).toEqual({ exito: false, mensaje: 'Es necesario ingresar el nombre y el carnet de quien recoge' });
    expect(sinCarnet).toEqual({ exito: false, mensaje: 'Es necesario ingresar el nombre y el carnet de quien recoge' });
  });
});