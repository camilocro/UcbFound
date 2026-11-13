import { useState } from 'react';

export default function FormularioReclamo({ presenter, idObjeto }) {
  const [explicacion, setExplicacion] = useState('');
  const [resultado, setResultado] = useState(null);
  const fueEnviada = resultado !== null && resultado.exito;

  const enviar = (evento) => {
    evento.preventDefault();
    setResultado(presenter.enviarReclamo(idObjeto, explicacion));
  };

  if (fueEnviada) {
    return (
      <div className="reclamo">
        <p id="mensaje-reclamo" className="mensaje mensaje--exito" role="status">
          {resultado.mensaje}
        </p>
      </div>
    );
  }

  return (
    <form id="form-reclamo" className="formulario reclamo" onSubmit={enviar} noValidate>
      <div className="campo">
        <label htmlFor="explicacion-reclamo">¿Por qué este objeto es tuyo?</label>
        <textarea
          id="explicacion-reclamo"
          name="explicacion"
          rows="3"
          placeholder="Ej. Tiene mi carnet adentro, la tapa tiene un sticker de la UCB"
          value={explicacion}
          onChange={(evento) => setExplicacion(evento.target.value)}
        />
        <span className="campo__ayuda">
          Un encargado de la UCB revisará tu solicitud.
        </span>
      </div>

      {resultado && (
        <p id="mensaje-reclamo" className="mensaje mensaje--error" role="status">
          {resultado.mensaje}
        </p>
      )}

      <button id="enviar-solicitud-button" type="submit" className="boton">
        Enviar solicitud
      </button>
    </form>
  );
}