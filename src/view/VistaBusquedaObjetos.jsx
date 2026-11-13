import { useState } from 'react';
import DetalleObjeto from './DetalleObjeto.jsx';
import { TODAS_LAS_CATEGORIAS } from '../model/categorias.js';

export default function VistaBusquedaObjetos({
  presenterBusqueda,
  presenterDetalle,
  presenterReclamo,
  alReportar,
}) {
  const categorias = presenterBusqueda.obtenerCategorias();

  const [textoBuscado, setTextoBuscado] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(
    TODAS_LAS_CATEGORIAS
  );
  const [resultado, setResultado] = useState(() =>
    presenterBusqueda.buscar('', TODAS_LAS_CATEGORIAS)
  );
  const [objetoSeleccionado, setObjetoSeleccionado] = useState(null);

  const buscar = (evento) => {
    evento.preventDefault();

    setResultado(
      presenterBusqueda.buscar(textoBuscado, categoriaSeleccionada)
    );
  };

  const cambiarCategoria = (evento) => {
    const nuevaCategoria = evento.target.value;

    setCategoriaSeleccionada(nuevaCategoria);
    setResultado(
      presenterBusqueda.buscar(textoBuscado, nuevaCategoria)
    );
  };

  if (objetoSeleccionado) {
    return (
      <DetalleObjeto
        objeto={objetoSeleccionado}
        alVolver={() => setObjetoSeleccionado(null)}
        presenterReclamo={presenterReclamo}
      />
    );
  }

  const sinResultados = resultado.objetos.length === 0;

  return (
    <section className="tarjeta tarjeta--ancha">
      <h1 className="tarjeta__titulo">Objetos encontrados</h1>

      <p className="tarjeta__subtitulo">
        Busca por nombre, descripción o categoría. Presiona un objeto para ver sus datos.
      </p>

      <form id="form-busqueda" className="buscador" onSubmit={buscar}>
        <input
          id="texto-busqueda"
          type="search"
          placeholder="Ej. mochila, cargador, llaves"
          value={textoBuscado}
          onChange={(evento) => setTextoBuscado(evento.target.value)}
        />

        <button id="buscar-button" type="submit" className="boton">
          Buscar
        </button>
      </form>

      <div className="filtro-categoria">
        <label htmlFor="filtro-categoria">Filtrar por categoría</label>

        <select
          id="filtro-categoria"
          value={categoriaSeleccionada}
          onChange={cambiarCategoria}
        >
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {sinResultados ? (
        <div className="sin-resultados" role="status">
          <svg
            className="sin-resultados__icono"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M15 32L50 15L85 32V72L50 90L15 72V32Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <path
              d="M15 32L50 50L85 32M50 50V90M32 24L68 42"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <circle
              cx="70"
              cy="69"
              r="15"
              fill="white"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              d="M81 80L91 90"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="sin-resultados__titulo">
            {resultado.mensaje}
          </h2>

          <p>
            ¿Quieres reportarlo como perdido?
          </p>

          <button
            type="button"
            className="sin-resultados__boton"
            onClick={alReportar}
          >
            Reportar como perdido
          </button>
        </div>
      ) : (
        <ul id="lista-objetos" className="lista-objetos">
          {resultado.objetos.map((objeto) => (
            <li key={objeto.id}>
              <button
                type="button"
                className="objeto objeto--boton"
                onClick={() =>
                  setObjetoSeleccionado(
                    presenterDetalle.verDetalle(objeto.id)
                  )
                }
              >
                <img
                  className="objeto__foto"
                  src={objeto.foto}
                  alt={objeto.nombre}
                />

                <span>
                  <span className="objeto__nombre">
                    {objeto.nombre}
                  </span>

                  <span className="objeto__fecha">
                    Encontrado el {objeto.fecha}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}