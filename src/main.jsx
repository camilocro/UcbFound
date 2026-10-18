import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import FormularioRegistro from './view/FormularioRegistro.jsx';
import FormularioInicioSesion from './view/FormularioInicioSesion.jsx';
import FormularioReporteObjetoPerdido from './view/FormularioReporteObjetoPerdido.jsx';
import VistaBusquedaObjetos from './view/VistaBusquedaObjetos.jsx';
import { RepositorioReportes } from './model/repositorioReportes.js';
import { RepositorioObjetosEncontrados } from './model/repositorioObjetosEncontrados.js';
import { fechaComoTexto } from './model/fecha.js';
import { ReportePresenter } from './presenter/reportePresenter.js';
import { BusquedaPresenter } from './presenter/busquedaPresenter.js';
import { Sesion } from './model/sesion.js';
import { SesionPresenter } from './presenter/sesionPresenter.js';

const sesion = new Sesion(window.sessionStorage);
const sesionPresenter = new SesionPresenter(sesion);
const reportePresenter = new ReportePresenter(new RepositorioReportes(window.localStorage), sesion);
const repositorioObjetos = new RepositorioObjetosEncontrados(window.localStorage);
const busquedaPresenter = new BusquedaPresenter(repositorioObjetos);
const PAGINAS = ['principal', 'inicio-sesion', 'registro', 'reportar-objeto', 'buscar-objetos'];

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
            <button id="ir-reportar-button" type="button" className="boton boton--ancho" onClick={() => irA('reportar-objeto')}>
              Reportar objeto perdido
            </button>
            <button id="ir-buscar-button" type="button" className="boton boton--ancho" onClick={() => irA('buscar-objetos')}>
              Buscar objetos encontrados
            </button>
          </section>
        )}
        {vista.pagina === 'reportar-objeto' && (
          <div>
            <FormularioReporteObjetoPerdido presenter={reportePresenter} fechaMaxima={fechaComoTexto(new Date())} />
            <button type="button" className="enlace" onClick={() => irA('principal')}>
              Volver al inicio
            </button>
          </div>
        )}
        {vista.pagina === 'buscar-objetos' && (
          <div>
            <VistaBusquedaObjetos presenter={busquedaPresenter} />
            <button type="button" className="enlace" onClick={() => irA('principal')}>
              Volver al inicio
            </button>
          </div>
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