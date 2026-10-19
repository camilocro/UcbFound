import { useState } from 'react';

const DATOS_INICIALES = { nombre: '', descripcion: '', foto: '' };
const LADO_MAXIMO = 800;

function leerArchivo(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(lector.error);
    lector.readAsDataURL(archivo);
  });
}

// Achica la foto (máximo 800 px por lado) para que entre en el almacenamiento del navegador
function achicarImagen(dataUrl) {
  return new Promise((resolve) => {
    const imagen = new Image();
    imagen.onload = () => {
      if (!imagen.width || !imagen.height) {
        resolve(dataUrl);
        return;
      }
      const escala = Math.min(1, LADO_MAXIMO / Math.max(imagen.width, imagen.height));
      const lienzo = document.createElement('canvas');
      lienzo.width = Math.round(imagen.width * escala);
      lienzo.height = Math.round(imagen.height * escala);
      const contexto = lienzo.getContext('2d');
      contexto.fillStyle = '#ffffff';
      contexto.fillRect(0, 0, lienzo.width, lienzo.height);
      contexto.drawImage(imagen, 0, 0, lienzo.width, lienzo.height);
      resolve(lienzo.toDataURL('image/jpeg', 0.8));
    };
    imagen.onerror = () => resolve(dataUrl);
    imagen.src = dataUrl;
  });
}

async function leerFoto(archivo) {
  const dataUrl = await leerArchivo(archivo);
  return archivo.type.startsWith('image/') ? achicarImagen(dataUrl) : dataUrl;
}

export default function FormularioObjetoEncontrado({ presenter, alVerLista }) {
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [resultado, setResultado] = useState(null);
  const [cargandoFoto, setCargandoFoto] = useState(false);
  const [claveArchivo, setClaveArchivo] = useState(0);

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatos((actuales) => ({ ...actuales, [name]: value }));
  };

  const cambiarFoto = async (evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) {
      setDatos((actuales) => ({ ...actuales, foto: '' }));
      return;
    }
    setCargandoFoto(true);
    const foto = await leerFoto(archivo);
    setDatos((actuales) => ({ ...actuales, foto }));
    setCargandoFoto(false);
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const respuesta = presenter.registrar(datos);
    setResultado(respuesta);
    if (respuesta.exito) {
      setDatos(DATOS_INICIALES);
      setClaveArchivo((clave) => clave + 1);
    }
  };

  return (
    <section className="tarjeta">
      <h1 className="tarjeta__titulo">Registrar objeto encontrado</h1>
      <p className="tarjeta__subtitulo">
        Sube una foto y describe el objeto para que su dueño pueda reconocerlo.
      </p>

      <form id="form-objeto-encontrado" className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="foto-encontrado">Foto del objeto</label>
          <input key={claveArchivo} id="foto-encontrado" name="foto" type="file" onChange={cambiarFoto} />
        </div>

        {datos.foto.startsWith('data:image/') && (
          <img id="vista-previa-foto" className="vista-previa" src={datos.foto} alt="Vista previa de la foto" />
        )}

        <div className="campo">
          <label htmlFor="nombre-encontrado">Nombre del objeto (opcional)</label>
          <input
            id="nombre-encontrado"
            name="nombre"
            type="text"
            placeholder="Ej. Billetera café"
            value={datos.nombre}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="descripcion-encontrado">Descripción</label>
          <textarea
            id="descripcion-encontrado"
            name="descripcion"
            rows="3"
            placeholder="Color, marca y dónde lo encontraste"
            value={datos.descripcion}
            onChange={cambiarCampo}
          />
        </div>

        {resultado && (
          <p id="mensaje-registro-objeto" className={`mensaje ${resultado.exito ? 'mensaje--exito' : 'mensaje--error'}`} role="status">
            {resultado.mensaje}
          </p>
        )}

        <button id="registrar-objeto-button" type="submit" className="boton" disabled={cargandoFoto}>
          {cargandoFoto ? 'Cargando foto...' : 'Registrar'}
        </button>

        {resultado && resultado.exito && (
          <button id="ver-lista-button" type="button" className="enlace" onClick={alVerLista}>
            Ver la lista de objetos encontrados
          </button>
        )}
      </form>
    </section>
  );
}