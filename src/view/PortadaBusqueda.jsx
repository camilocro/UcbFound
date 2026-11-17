function IconoLupa() {
  return (
    <svg className="boton-buscar__icono" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </svg>
  );
}

export default function PortadaBusqueda({ alBuscar }) {
  return (
    <section className="portada">
      <h2 className="portada__titulo">¿Perdiste algo en la UCB?</h2>
      <p className="portada__subtitulo">
        Busca entre los objetos que otras personas ya encontraron.
      </p>
      <button
        id="ir-buscar-button"
        type="button"
        className="boton-buscar"
        onClick={alBuscar}
      >
        <IconoLupa />
        Buscar objetos encontrados
      </button>
    </section>
  );
}