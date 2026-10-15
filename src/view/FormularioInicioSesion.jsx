import { useState } from 'react';
import { RepositorioUsuarios } from '../model/repositorioUsuarios.js';
import { InicioSesionPresenter } from '../presenter/inicioSesionPresenter.js';

const presenter = new InicioSesionPresenter(new RepositorioUsuarios(window.localStorage));

const DATOS_INICIALES = { correo: '', contrasena: '' };

export default function FormularioInicioSesion({ alIniciarSesion }) {
  const [datos, setDatos] = useState(DATOS_INICIALES);
  const [resultado, setResultado] = useState(null);

  const cambiarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatos({ ...datos, [name]: value });
  };

  const enviar = (evento) => {
    evento.preventDefault();
    const respuesta = presenter.procesarInicioSesion(datos);
    if (respuesta.exito) {
      alIniciarSesion(respuesta.usuario);
    } else {
      setResultado(respuesta);
    }
  };

  return (
    <section className="tarjeta">
      <h1 className="tarjeta__titulo">Iniciar sesión</h1>
      <p className="tarjeta__subtitulo">
        Ingresa con tu correo institucional para reportar y buscar objetos en el campus.
      </p>

      <form id="form-login" className="formulario" onSubmit={enviar} noValidate>
        <div className="campo">
          <label htmlFor="correo-login">Correo institucional</label>
          <input
            id="correo-login"
            name="correo"
            type="email"
            placeholder="tunombre@ucb.edu.bo"
            value={datos.correo}
            onChange={cambiarCampo}
          />
        </div>

        <div className="campo">
          <label htmlFor="contrasena-login">Contraseña</label>
          <input
            id="contrasena-login"
            name="contrasena"
            type="password"
            placeholder="Tu contraseña"
            value={datos.contrasena}
            onChange={cambiarCampo}
          />
        </div>

        {resultado && (
          <p id="mensaje-login" className="mensaje mensaje--error" role="status">
            {resultado.mensaje}
          </p>
        )}

        <button id="iniciar-sesion-button" type="submit" className="boton">
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}