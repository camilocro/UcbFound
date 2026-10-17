import { useState } from 'react';

export default function VistaBusquedaObjetos({ presenter }) {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState(() => presenter.buscar(''));

  const buscar = (evento) => {
    evento.preventDefault();
    setResultado(presenter.buscar(texto));
  };

  return (
    <section className="tarjeta tarjeta--ancha">
      <h1 className="tarjeta__titulo">Objetos encontrados</h1>
      <p className="tarjeta__subtitulo">Busca por nombre o descripción. Sin texto se muestran todos, del más reciente al más antiguo.</p>

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
          <li key={objeto.id} className="objeto">
            <img className="objeto__foto" src={objeto.foto} alt={objeto.nombre} />
            <span>
              <span className="objeto__nombre">{objeto.nombre}</span>
              <span className="objeto__fecha">Encontrado el {objeto.fecha}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}