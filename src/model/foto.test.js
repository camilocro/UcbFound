import { esImagen } from './foto';

describe('esImagen', () => {
  test('reconoce como imagen una foto cuyo contenido es una imagen', () => {
    expect(esImagen('data:image/png;base64,AAA')).toBe(true);
  });
});