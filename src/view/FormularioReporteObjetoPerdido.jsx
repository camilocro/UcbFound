
import { useState } from 'react';

const CAMPOS_INICIALES = {
  nombre: '',
  descripcion: '',
  fecha: '',
  categoria: '',
  bloque: '',
  aula: '',
  celular: '',
};

export default function FormularioReporteObjetoPerdido({ presenter, fechaMaxima }) {
  const [camposDelFormulario, setCamposDelFormulario] =
    useState(CAMPOS_INICIALES);
  const [resultado, setResultado] = useState(null);
  const categorias = presenter.obtenerCategorias();
  const bloques = presenter.obtenerBloques();

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
      <p className="tarjeta__subtitulo">Cuéntanos qué perdiste y cuándo.</p>

      <form id="form-reporte" className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="nombre-objeto">Nombre del objeto *</label>
          <input
            id="nombre-objeto"
            name="nombre"
            autoFocus
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
          <label htmlFor="fecha-perdida">Fecha *</label>
          <input
            id="fecha-perdida"
            name="fecha"
            type="date"
            max={fechaMaxima}
            value={camposDelFormulario.fecha}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria-perdido">Categoría *</label>
          <select
            id="categoria-perdido"
            name="categoria"
            value={camposDelFormulario.categoria}
            onChange={cambiarCampo}
          >
            <option value="">Elige una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="bloque-perdido">Dónde lo perdiste *</label>
          <select
            id="bloque-perdido"
            name="bloque"
            value={camposDelFormulario.bloque}
            onChange={cambiarCampo}
          >
            <option value="">Elige un bloque</option>
            {bloques.map((bloque) => (
              <option key={bloque} value={bloque}>
                {bloque}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label htmlFor="aula-perdido">Aula (opcional)</label>
          <input
            id="aula-perdido"
            name="aula"
            type="text"
            placeholder="Ej. A-204"
            value={camposDelFormulario.aula}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="celular-perdido">Celular de contacto (opcional)</label>
          <input
            id="celular-perdido"
            name="celular"
            type="tel"
            inputMode="numeric"
            placeholder="Ej. 71234567"
            value={camposDelFormulario.celular}
            onChange={cambiarCampo}
          />
        </div>

        {resultado && (
          <p id="mensaje-reporte" className={`mensaje ${resultado.exito ? 'mensaje--exito' : 'mensaje--error'}`} role="status">
            {resultado.mensaje}
          </p>
        )}

        <button id="reportar-button" type="submit" className="boton boton--primario">
          Enviar reporte
        </button>
      </form>
    </section>
  );
}