import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import FormularioRegistro from './view/FormularioRegistro.jsx';
import FormularioInicioSesion from './view/FormularioInicioSesion.jsx';
import { Sesion } from './model/sesion.js';
import { SesionPresenter } from './presenter/sesionPresenter.js';

const sesionPresenter = new SesionPresenter(new Sesion(window.sessionStorage));
const PAGINAS = ['principal', 'inicio-sesion', 'registro'];

function leerVista() {
  const direccion = window.location.hash.replace('#/', '');
  const solicitada = PAGINAS.includes(direccion) ? direccion : 'principal';
  const pagina = sesionPresenter.mostrarPagina(solicitada);
  return { pagina, pidioCuenta: pagina !== solicitada };
}

function App() {
  const [vista, setVista] = useState(leerVista);
  const usuario = sesionPresenter.obtenerUsuario();

  useEffect(() => {
    const alCambiarDireccion = () => setVista(leerVista());
    window.addEventListener('hashchange', alCambiarDireccion);
    return () => window.removeEventListener('hashchange', alCambiarDireccion);
  }, []);

  const irA = (pagina) => {
    window.location.hash = `/${pagina}`;
    setVista(leerVista());
  };

  return (
    <div className="app">
      <header className="encabezado">
        <span className="logo"><span>UCB</span>Found</span>
        <div className="encabezado__acciones">
          <span className="encabezado__texto">Objetos perdidos y encontrados</span>
          {usuario && (
            <button id="cerrar-sesion-button" type="button" className="boton-salir" onClick={() => irA(sesionPresenter.cerrarSesion())}>
              Cerrar sesión
            </button>
          )}
        </div>
      </header>
      <main className="contenido">
        {vista.pagina === 'principal' && (
          <section className="tarjeta">
            <h1 className="tarjeta__titulo">Hola, {usuario.nombre}</h1>
            <p className="tarjeta__subtitulo">Sesión iniciada con {usuario.correo}.</p>
          </section>
        )}
        {vista.pagina === 'registro' && (
          <div>
            <FormularioRegistro />
            <button type="button" className="enlace" onClick={() => irA('inicio-sesion')}>
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        )}
        {vista.pagina === 'inicio-sesion' && (
          <div>
            {vista.pidioCuenta && (
              <p id="aviso-sesion" className="mensaje aviso" role="status">
                Inicia sesión para continuar.
              </p>
            )}
            <FormularioInicioSesion alIniciarSesion={(usuarioIngresado) => irA(sesionPresenter.iniciarSesion(usuarioIngresado))} />
            <button type="button" className="enlace" onClick={() => irA('registro')}>
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        )}
      </main>
      <footer className="pie">UCBFound · Universidad Católica Boliviana</footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);