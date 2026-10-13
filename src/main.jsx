import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div className="app">
      <header className="encabezado">
        <span className="logo"><span>UCB</span>Found</span>
        <span className="encabezado__texto">Objetos perdidos y encontrados</span>
      </header>
      <main className="contenido">
        <p>Próximamente: registro de usuarios.</p>
      </main>
      <footer className="pie">UCBFound · Universidad Católica Boliviana</footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);