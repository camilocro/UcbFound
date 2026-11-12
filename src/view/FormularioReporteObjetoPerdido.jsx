
import { useState } from 'react';

const CAMPOS_INICIALES = { nombre: '', descripcion: '', fecha: '' };

export default function FormularioReporteObjetoPerdido({ presenter, fechaMaxima }) {
  const [camposDelFormulario, setCamposDelFormulario] =
    useState(CAMPOS_INICIALES);
  const [resultado, setResultado] = useState(null);

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setCamposDelFormulario({
      ...camposDelFormulario,
      [name]: value
    });
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const resultadoDelReporte =
      presenter.reportarObjeto(camposDelFormulario);
    setResultado(resultadoDelReporte);

    if (resultadoDelReporte.exito) {
      setCamposDelFormulario(CAMPOS_INICIALES);
    }
  };

  return (
    <section className="tarjeta">
      <h1 className="tarjeta__titulo">Reportar objeto perdido</h1>
      <p className="tarjeta__subtitulo">
        Cuéntanos qué perdiste y cuándo, para que quede registrado a tu nombre.
      </p>

      <form id="form-reporte" className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="nombre-objeto">Nombre del objeto</label>
          <input
            id="nombre-objeto"
            name="nombre"
            type="text"
            placeholder="Ej. Mochila negra"
            value={camposDelFormulario.nombre}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="descripcion-objeto">Descripción</label>
          <textarea
            id="descripcion-objeto"
            name="descripcion"
            rows="3"
            placeholder="Color, marca, detalles que ayuden a reconocerlo"
            value={camposDelFormulario.descripcion}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="fecha-perdida">Fecha en que lo perdiste</label>
          <input
            id="fecha-perdida"
            name="fecha"
            type="date"
            max={fechaMaxima}
            value={camposDelFormulario.fecha}
            onChange={cambiarCampo}
          />
        </div>

        {resultado && (
          <p id="mensaje-reporte" className={`mensaje ${resultado.exito ? 'mensaje--exito' : 'mensaje--error'}`} role="status">
            {resultado.mensaje}
          </p>
        )}

        <button id="reportar-button" type="submit" className="boton">
          Reportar
        </button>
      </form>
    </section>
  );
}
