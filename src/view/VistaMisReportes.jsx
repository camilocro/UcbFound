import { useState } from 'react';

export default function VistaMisReportes({ presenter }) {
  const [resultado] = useState(() => presenter.obtenerMisReportes());

  return (
    <section id="mis-reportes" className="tarjeta tarjeta--ancha">
      <h2 className="tarjeta__titulo">Mis reportes</h2>
      {resultado.reportes.length === 0 ? (
        <p id="mensaje-mis-reportes" className="mensaje aviso" role="status">
          {resultado.mensaje}
        </p>
      ) : (
        <ul id="lista-mis-reportes" className="lista-objetos">
          {resultado.reportes.map((reporte, posicion) => (
            <li key={`${reporte.nombre}-${reporte.fecha}-${posicion}`} className="objeto">
              <span>
                <span className="objeto__nombre">{reporte.nombre}</span>
                <span className="objeto__fecha">Perdido el {reporte.fecha}</span>
                <span className="objeto__fecha">Lugar: {reporte.bloque}{reporte.aula ? `, ${reporte.aula}` : ''}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}