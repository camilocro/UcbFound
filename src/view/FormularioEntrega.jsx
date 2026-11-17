import { useState } from 'react';

export default function FormularioEntrega({ presenter, idObjeto, alEntregar }) {
  const [nombre, setNombre] = useState('');
  const [carnet, setCarnet] = useState('');
  const [mensajeDeError, setMensajeDeError] = useState('');

  const entregar = (evento) => {
    evento.preventDefault();
    const resultado = presenter.registrarEntrega(idObjeto, { nombre, carnet });
    if (resultado.exito) {
      alEntregar(resultado.mensaje);
    } else {
      setMensajeDeError(resultado.mensaje);
    }
  };

  return (
    <form id={`form-entrega-${idObjeto}`} className="formulario" onSubmit={entregar} noValidate>
      <div className="campo">
        <label htmlFor={`nombre-recoge-${idObjeto}`}>Nombre de quien recoge</label>
        <input id={`nombre-recoge-${idObjeto}`} type="text" value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
      </div>
      <div className="campo">
        <label htmlFor={`carnet-recoge-${idObjeto}`}>Carnet de identidad (opcional)</label>
        <input id={`carnet-recoge-${idObjeto}`} type="text" value={carnet} onChange={(evento) => setCarnet(evento.target.value)} />
      </div>
      {mensajeDeError && (
        <p className="mensaje mensaje--error" role="status">
          {mensajeDeError}
        </p>
      )}
      <button id={`entregar-button-${idObjeto}`} type="submit" className="boton">
        Registrar entrega
      </button>
    </form>
  );
}