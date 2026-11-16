import { ordenarDelMasRecienteAlMasAntiguo } from './orden.js';

describe('Orden: del más reciente al más antiguo', () => {
  it('debería poner primero la fecha más reciente y, si empatan, el último que se guardó, sin cambiar la lista original', () => {
    const lista = [
      { nombre: 'Mochila', fecha: '2026-10-10' },
      { nombre: 'Cargador', fecha: '2026-10-14' },
      { nombre: 'Botella', fecha: '2026-10-10' },
    ];
    const nombres = (elementos) => elementos.map((elemento) => elemento.nombre);
    expect(nombres(ordenarDelMasRecienteAlMasAntiguo(lista))).toEqual(['Cargador', 'Botella', 'Mochila']);
    expect(nombres(lista)).toEqual(['Mochila', 'Cargador', 'Botella']);
  });
});