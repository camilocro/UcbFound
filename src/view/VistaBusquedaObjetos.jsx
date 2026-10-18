import { useState } from 'react';
import DetalleObjeto from './DetalleObjeto.jsx';

export default function VistaBusquedaObjetos({ presenterBusqueda, presenterDetalle }) {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(() => presenterBusqueda.buscar(''));
  const [seleccionado, setSeleccionado] = useState(null);

  const buscar = (evento) => {
    evento.preventDefault();
    setResultado(presenterBusqueda.buscar(texto));
  };

  if (seleccionado) {
    return <DetalleObjeto objeto={seleccionado} alVolver={() => setSeleccionado(null)} />;
  }

  return (
    <section className="tarjeta tarjeta--ancha">
      <h1 className="tarjeta__titulo">Objetos encontrados</h1>
      <p className="tarjeta__subtitulo">Busca por nombre o descripción. Presiona un objeto para ver sus datos.</p>

      <form id="form-busqueda" className="buscador" onSubmit={buscar}>
        <input
          id="texto-busqueda"
          type="search"
          placeholder="Ej. mochila, cargador, llaves"
          value={texto}
          onChange={(evento) => setTexto(evento.target.value)}
        />
        <button id="buscar-button" type="submit" className="boton">
          Buscar
        </button>
      </form>

      {resultado.mensaje && (
        <p id="mensaje-busqueda" className="mensaje mensaje--error" role="status">
          {resultado.mensaje}
        </p>
      )}

      <ul id="lista-objetos" className="lista-objetos">
        {resultado.objetos.map((objeto) => (
          <li key={objeto.id}>
            <button type="button" className="objeto objeto--boton" onClick={() => setSeleccionado(presenterDetalle.verDetalle(objeto.id))}>
              <img className="objeto__foto" src={objeto.foto} alt={objeto.nombre} />
              <span>
                <span className="objeto__nombre">{objeto.nombre}</span>
                <span className="objeto__fecha">Encontrado el {objeto.fecha}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}