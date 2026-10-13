import { useState } from 'react';
import { procesarRegistro } from '../presenter.js';

const DATOS_INICIALES = { nombre: '', correo: '', contrasena: '' };

export default function FormularioRegistro() {
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [resultado, setResultado] = useState(null);

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const respuesta = procesarRegistro(datos);
    setResultado(respuesta);
    if (respuesta.exito) {
      setDatos(DATOS_INICIALES);
    }
  };

  return (
    <section className="tarjeta">
      <h1 className="tarjeta__titulo">Crear cuenta</h1>
      <p className="tarjeta__subtitulo">
        Regístrate con tu correo institucional para reportar y buscar objetos en el campus.
      </p>

      <form id="form-registro" className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={datos.nombre}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo institucional</label>
          <input
            id="correo"
            name="correo"
            type="email"
            placeholder="tunombre@ucb.edu.bo"
            value={datos.correo}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            name="contrasena"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={datos.contrasena}
            onChange={cambiarCampo}
          />
          <small className="campo__ayuda">Debe tener al menos 8 caracteres.</small>
        </div>

        {resultado && (
          <p id="mensaje" className={`mensaje ${resultado.exito ? 'mensaje--exito' : 'mensaje--error'}`} role="status">
            {resultado.mensaje}
          </p>
        )}

        <button id="crear-cuenta-button" type="submit" className="boton">
          Crear cuenta
        </button>
      </form>
    </section>
  );
}