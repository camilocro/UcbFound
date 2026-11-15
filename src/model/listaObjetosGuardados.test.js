import { ListaObjetosGuardados } from './listaObjetosGuardados.js';
import { ObjetoEncontrado } from './objetoEncontrado.js';

const mochila = new ObjetoEncontrado({ id: 'obj-1', nombre: 'Mochila negra', descripcion: 'Tiene un llavero de la UCB', fecha: '2026-10-10', foto: '', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' });
const cargador = new ObjetoEncontrado({ id: 'obj-2', nombre: 'Cargador de laptop', descripcion: 'Marca HP, cable negro', fecha: '2026-10-14', foto: '', correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo' });
const botella = new ObjetoEncontrado({ id: 'obj-3', nombre: 'Botella de agua', descripcion: 'Botella azul con stickers', fecha: '2026-10-12', foto: '', correoDeQuienEncontro: 'ana.lopez@ucb.edu.bo' });

const nombres = (resultado) => resultado.objetos.map((objeto) => objeto.nombre);

describe('HU-14 Lista de objetos guardados', () => {
  it('debería mostrar todos los objetos guardados, del más reciente al más antiguo', () => {
    const resultado = new ListaObjetosGuardados([mochila, cargador, botella]).obtener();
    expect(nombres(resultado)).toEqual(['Cargador de laptop', 'Botella de agua', 'Mochila negra']);
  });
});

describe('HU-14 Lista de objetos guardados vacía', () => {
  it('debería avisar cuando no hay objetos guardados', () => {
    const resultado = new ListaObjetosGuardados([]).obtener();
    expect(resultado).toEqual({ objetos: [], mensaje: 'No hay objetos guardados por ahora' });
  });
});

describe('HU-15 Criterio 4: objetos ya entregados', () => {
  it('no debería mostrar en la lista los objetos que ya fueron recogidos', () => {
    const llavesRecogidas = new ObjetoEncontrado({ id: 'obj-5', nombre: 'Llaves', descripcion: 'Llavero con tres llaves', fecha: '2026-10-13', foto: '', correoDeQuienEncontro: 'luis.rojas@ucb.edu.bo', recogida: { nombre: 'Juan Pérez', carnet: '1234567', fecha: '2026-10-20', correoDelEncargado: 'encargado.objetos@ucb.edu.bo' } });
    const resultado = new ListaObjetosGuardados([mochila, llavesRecogidas]).obtener();
    expect(nombres(resultado)).toEqual(['Mochila negra']);
  });
});