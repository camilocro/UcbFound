
import { useState } from 'react';

const CAMPOS_INICIALES = { nombre: '', correo: '', contrasena: '' };

export default function FormularioRegistro({ presenter }) {
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
    const resultadoDelRegistro =
      presenter.procesarRegistro(camposDelFormulario);
    setResultado(resultadoDelRegistro);

    if (resultadoDelRegistro.exito) {
      setCamposDelFormulario(CAMPOS_INICIALES);
    }
  };

  return (
    <section className="tarjeta">
      <h1 className="tarjeta__titulo">Crea tu cuenta</h1>
      <p className="tarjeta__subtitulo">Usa tu correo de la UCB.</p>

      <form id="form-registro" className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            autoComplete="name"
            autoFocus
            type="text"
            placeholder="Tu nombre"
            value={camposDelFormulario.nombre}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo institucional</label>
          <input
            id="correo"
            name="correo"
            autoComplete="email"
            type="email"
            placeholder="nombre@ucb.edu.bo"
            value={camposDelFormulario.correo}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            autoComplete="new-password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={camposDelFormulario.contrasena}
            onChange={cambiarCampo}
          />
        </div>

        {resultado && (
          <p id="mensaje" className={`mensaje ${resultado.exito ? 'mensaje--exito' : 'mensaje--error'}`} role="status">
            {resultado.mensaje}
          </p>
        )}

        <button id="crear-cuenta-button" type="submit" className="boton boton--primario">
          Crear cuenta
        </button>
      </form>
    </section>
  );
}