import { useState } from 'react';

export default function VistaMisReportes({ presenter }) {
  const [resultado] = useState(() => presenter.obtenerMisReportes());
  const [posicionDelDetalle, setPosicionDelDetalle] = useState(null);

  const alternarDetalle = (posicion) => {
    setPosicionDelDetalle((posicionActual) => (posicionActual === posicion ? null : posicion));
  };

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
            <li key={`${reporte.nombre}-${reporte.fecha}-${posicion}`}>
              <button
                type="button"
                className="objeto objeto--boton"
                aria-expanded={posicionDelDetalle === posicion}
                onClick={() => alternarDetalle(posicion)}
              >
                <span>
                  <span className="objeto__nombre">{reporte.nombre}</span>
                  <span className="objeto__fecha">Perdido el {reporte.fecha}</span>
                  <span className="etiqueta">{reporte.estado}</span>
                </span>
              </button>
              {posicionDelDetalle === posicion && (
                <div className="detalle-reporte">
                  <p className="detalle__dato">
                    <strong>Lugar:</strong> {reporte.lugar}
                  </p>
                  {reporte.descripcion && (
                    <p className="detalle__dato">
                      <strong>Descripción:</strong> {reporte.descripcion}
                    </p>
                  )}
                  {reporte.celular && (
                    <p className="detalle__dato">
                      <strong>Celular de contacto:</strong> {reporte.celular}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}