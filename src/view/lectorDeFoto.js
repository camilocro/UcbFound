import { calcularTamanoReducido } from '../model/foto.js';

function leerArchivo(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(lector.error);
    lector.readAsDataURL(archivo);
  });
}

// Achica la foto para que entre en el almacenamiento del navegador
function achicarImagen(dataUrl) {
  return new Promise((resolve) => {
    const imagen = new Image();
    imagen.onload = () => {
      if (!imagen.width || !imagen.height) {
        resolve(dataUrl);
        return;
      }
      const { ancho, alto } = calcularTamanoReducido(imagen.width, imagen.height);
      const lienzo = document.createElement('canvas');
      lienzo.width = ancho;
      lienzo.height = alto;
      const contexto = lienzo.getContext('2d');
      contexto.fillStyle = '#ffffff';
      contexto.fillRect(0, 0, ancho, alto);
      contexto.drawImage(imagen, 0, 0, ancho, alto);
      resolve(lienzo.toDataURL('image/jpeg', 0.8));
    };
    imagen.onerror = () => resolve(dataUrl);
    imagen.src = dataUrl;
  });
}

export async function leerFoto(archivo) {
  const dataUrl = await leerArchivo(archivo);
  return archivo.type.startsWith('image/') ? achicarImagen(dataUrl) : dataUrl;
}