import { useState } from 'react';
import { esImagen } from '../model/foto.js';
import { leerFoto } from './lectorDeFoto.js';

const DATOS_INICIALES = { nombre: '', descripcion: '', foto: '', categoria: '', bloque: '', aula: '', celular: '' };
const MENSAJE_ERROR_FOTO = 'No se pudo cargar la foto, intenta con otra imagen';

function IconoCamara() {
  return (
    <svg className="zona-foto__icono" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export default function FormularioObjetoEncontrado({ presenter, alVerLista }) {
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [resultado, setResultado] = useState(null);
  const [estaCargandoFoto, setEstaCargandoFoto] = useState(false);
  const [errorFoto, setErrorFoto] = useState('');
  const [claveCampoFoto, setClaveCampoFoto] = useState(0);
  const categorias = presenter.obtenerCategorias();
  const bloques = presenter.obtenerBloques();

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatos((datosActuales) => ({ ...datosActuales, [name]: value }));
  };

  const cambiarFoto = async (evento) => {
    const archivo = evento.target.files[0];
    setErrorFoto('');
    if (!archivo) {
      setDatos((datosActuales) => ({ ...datosActuales, foto: '' }));
      return;
    }
    setEstaCargandoFoto(true);
    try {
      const foto = await leerFoto(archivo);
      setDatos((datosActuales) => ({ ...datosActuales, foto }));
    } catch {
      setDatos((datosActuales) => ({ ...datosActuales, foto: '' }));
      setErrorFoto(MENSAJE_ERROR_FOTO);
    } finally {
      setEstaCargandoFoto(false);
    }
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const respuesta = presenter.registrar(datos);
    setResultado(respuesta);
    if (respuesta.exito) {
      setDatos(DATOS_INICIALES);
      setClaveCampoFoto((claveAnterior) => claveAnterior + 1);
    }
  };

  const tieneFotoValida = esImagen(datos.foto);

  return (
    <section className="tarjeta">
      <h1 className="tarjeta__titulo">Reportar objeto encontrado</h1>
      <p className="tarjeta__subtitulo">
        Sube una foto y describe el objeto para que su dueño pueda reconocerlo.
      </p>

      <form id="form-objeto-encontrado" className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <span className="campo__etiqueta">Foto del objeto *</span>
          <input
            key={claveCampoFoto}
            id="foto-encontrado"
            name="foto"
            type="file"
            className="oculto-visual"
            onChange={cambiarFoto}
          />
          <label htmlFor="foto-encontrado" className="zona-foto">
            {tieneFotoValida ? (
              <img id="vista-previa-foto" className="vista-previa" src={datos.foto} alt="Vista previa de la foto" />
            ) : (
              <>
                <IconoCamara />
                <span className="zona-foto__texto">Sube una foto</span>
                <span className="zona-foto__ayuda">Toca aquí para elegir una imagen</span>
              </>
            )}
          </label>
          {errorFoto && (
            <p id="mensaje-error-foto" className="mensaje mensaje--error" role="alert">
              {errorFoto}
            </p>
          )}
        </div>

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
          <label htmlFor="categoria-encontrado">Categoría *</label>
          <select id="categoria-encontrado" name="categoria" value={datos.categoria} onChange={cambiarCampo}>
            <option value="">Elige una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="bloque-encontrado">Bloque donde lo encontraste *</label>
          <select id="bloque-encontrado" name="bloque" value={datos.bloque} onChange={cambiarCampo}>
            <option value="">Elige un bloque</option>
            {bloques.map((bloque) => (
              <option key={bloque} value={bloque}>
                {bloque}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="aula-encontrado">Aula (opcional)</label>
          <input
            id="aula-encontrado"
            name="aula"
            type="text"
            placeholder="Ej. Aula 201"
            value={datos.aula}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="descripcion-encontrado">Descripción *</label>
          <textarea
            id="descripcion-encontrado"
            name="descripcion"
            rows="3"
            placeholder="Color, marca y dónde lo encontraste"
            value={datos.descripcion}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="celular-encontrado">Celular de contacto (opcional)</label>
          <input
            id="celular-encontrado"
            name="celular"
            type="tel"
            inputMode="numeric"
            placeholder="Ej. 71234567"
            value={datos.celular}
            onChange={cambiarCampo}
          />
        </div>

        {resultado && (
          <p id="mensaje-registro-objeto" className={`mensaje ${resultado.exito ? 'mensaje--exito' : 'mensaje--error'}`} role="status">
            {resultado.mensaje}
          </p>
        )}

        <button id="registrar-objeto-button" type="submit" className="boton boton--primario" disabled={estaCargandoFoto}>
          {estaCargandoFoto ? 'Cargando foto...' : 'Enviar reporte'}
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