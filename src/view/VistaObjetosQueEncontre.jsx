import { useState } from 'react';

export default function VistaObjetosQueEncontre({ presenter }) {
  const [resultado] = useState(() => presenter.obtenerMisObjetos());

  return (
    <section id="objetos-que-encontre" className="tarjeta tarjeta--ancha">
      <h2 className="tarjeta__titulo">Objetos que encontré</h2>
      {resultado.objetos.length === 0 && (
        <p id="mensaje-objetos-que-encontre" className="mensaje aviso" role="status">
          {resultado.mensaje}
        </p>
      )}
    </section>
  );
}