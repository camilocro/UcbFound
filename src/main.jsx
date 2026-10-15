import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import FormularioRegistro from './view/FormularioRegistro.jsx';
import FormularioInicioSesion from './view/FormularioInicioSesion.jsx';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  return (
    <div className="app">
      <header className="encabezado">
        <span className="logo"><span>UCB</span>Found</span>
        <span className="encabezado__texto">Objetos perdidos y encontrados</span>
      </header>
      <main className="contenido">
        {usuario ? (
          <section className="tarjeta">
            <h1 className="tarjeta__titulo">Hola, {usuario.nombre}</h1>
            <p className="tarjeta__subtitulo">Sesión iniciada con {usuario.correo}.</p>
          </section>
        ) : mostrarRegistro ? (
          <div>
            <FormularioRegistro />
            <button type="button" className="enlace" onClick={() => setMostrarRegistro(false)}>
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </div>
        ) : (
          <div>
            <FormularioInicioSesion alIniciarSesion={setUsuario} />
            <button type="button" className="enlace" onClick={() => setMostrarRegistro(true)}>
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