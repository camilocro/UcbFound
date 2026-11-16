import { describirCantidadDeObjetos } from './cantidad.js';

describe('Búsqueda: cantidad de resultados', () => {
  it('debería decir "objeto" en singular cuando hay uno y en plural cuando hay varios', () => {
    expect(describirCantidadDeObjetos(1)).toEqual('1 objeto encontrado');
    expect(describirCantidadDeObjetos(6)).toEqual('6 objetos encontrados');
  });
});