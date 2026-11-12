import { esImagen, calcularTamanoReducido } from './foto';

describe('esImagen', () => {
  test('reconoce como imagen una foto cuyo contenido es una imagen', () => {
    expect(esImagen('data:image/png;base64,AAA')).toBe(true);
  });
});

describe('calcularTamanoReducido', () => {
  test('reduce una foto grande para que su lado mayor mida 800 px', () => {
    expect(calcularTamanoReducido(1600, 800)).toEqual({ ancho: 800, alto: 400 });
  });

  test('no cambia el tamaño de una foto que ya es pequeña', () => {
    expect(calcularTamanoReducido(400, 200)).toEqual({ ancho: 400, alto: 200 });
  });
});