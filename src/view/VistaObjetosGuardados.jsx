import { useState } from 'react';
import FormularioEntrega from './FormularioEntrega.jsx';

export default function VistaObjetosGuardados({ presenter }) {
  const [resultado, setResultado] = useState(() => presenter.obtenerObjetosGuardados());
  const [idObjetoAEntregar, setIdObjetoAEntregar] = useState(null);
  const [mensajeDeEntrega, setMensajeDeEntrega] = useState('');

  const alEntregar = (mensaje) => {
    setMensajeDeEntrega(mensaje);
    setIdObjetoAEntregar(null);
    setResultado(presenter.obtenerObjetosGuardados());
  };

  return (
    <section id="objetos-guardados" className="tarjeta tarjeta--ancha">
      <h1 className="tarjeta__titulo">Objetos guardados</h1>
      <p className="tarjeta__subtitulo">Objetos que están en custodia del encargado de la UCB.</p>

      {mensajeDeEntrega && (
        <p id="mensaje-entrega" className="mensaje mensaje--exito" role="status">
          {mensajeDeEntrega}
        </p>
      )}

      {resultado.objetos.length === 0 ? (
        <p id="mensaje-objetos-guardados" className="mensaje aviso" role="status">
          {resultado.mensaje}
        </p>
      ) : (
        <ul id="lista-objetos-guardados" className="lista-objetos">
          {resultado.objetos.map((objeto) => (
            <li key={objeto.id} className="objeto">
              <img className="objeto__foto" src={objeto.foto} alt={objeto.nombre} />
              <span>
                <span className="objeto__nombre">{objeto.nombre}</span>
                <span className="objeto__fecha">Encontrado el {objeto.fecha}</span>
                <span className="objeto__fecha">Lugar: {objeto.lugar}</span>
                <span className="objeto__fecha">Lo encontró: {objeto.correoDeQuienEncontro}</span>
                {idObjetoAEntregar === objeto.id ? (
                  <FormularioEntrega presenter={presenter} idObjeto={objeto.id} alEntregar={alEntregar} />
                ) : (
                  <button type="button" className="enlace" onClick={() => setIdObjetoAEntregar(objeto.id)}>
                    Registrar quién lo recogió
                  </button>
                )}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}