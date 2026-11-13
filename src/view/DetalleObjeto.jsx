import { useState } from 'react';
import FormularioReclamo from './FormularioReclamo.jsx';

export default function DetalleObjeto({ objeto, alVolver, presenterReclamo }) {
  const [estaReclamando, setEstaReclamando] = useState(false);

  return (
    <section id="detalle-objeto" className="tarjeta">
      <img className="detalle__foto" src={objeto.foto} alt={objeto.nombre} />
      <h1 className="tarjeta__titulo">{objeto.nombre}</h1>
      <p className="detalle__dato">
        <strong>Descripción:</strong> {objeto.descripcion}
      </p>
      <p className="detalle__dato">
        <strong>Fecha en que se encontró:</strong> {objeto.fecha}
      </p>
      <p className="detalle__dato">
        <strong>Categoría:</strong> <span className="etiqueta">{objeto.categoria}</span>
      </p>
      <p className="detalle__dato">
        <strong>Lugar donde se encontró:</strong> {objeto.lugar}
      </p>
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
      <button id="volver-lista-button" type="button" className="enlace" onClick={alVolver}>
        Volver a la lista
      </button>
    </section>
  );
}