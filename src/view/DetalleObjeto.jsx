import { useState } from 'react';
import FormularioReclamo from './FormularioReclamo.jsx';

export default function DetalleObjeto({ objeto, alVolver, presenterReclamo }) {
  const [estaReclamando, setEstaReclamando] = useState(false);

  return (
    <section id="detalle-objeto" className="tarjeta tarjeta--ancha detalle">
      <button id="volver-lista-button" type="button" className="detalle__volver" onClick={alVolver}>
        ‹ Volver a la lista
      </button>

      <img className="detalle__foto" src={objeto.foto} alt={objeto.nombre} />

      <span className="etiqueta">{objeto.categoria}</span>
      <h1 className="tarjeta__titulo detalle__titulo">{objeto.nombre}</h1>
      <p className="detalle__descripcion">{objeto.descripcion}</p>

      <dl className="detalle__datos">
        <div className="detalle__dato">
          <dt>Fecha en que se encontró</dt>
          <dd>{objeto.fecha}</dd>
        </div>
        <div className="detalle__dato">
          <dt>Lugar donde se encontró</dt>
          <dd>{objeto.lugar}</dd>
        </div>
      </dl>

      {estaReclamando ? (
        <FormularioReclamo presenter={presenterReclamo} idObjeto={objeto.id} />
      ) : (
        <button
          id="reclamar-objeto-button"
          type="button"
          className="boton boton--ancho"
          onClick={() => setEstaReclamando(true)}
        >
          Reclamar objeto
        </button>
      )}
    </section>
  );
}