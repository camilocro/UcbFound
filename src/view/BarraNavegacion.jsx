export default function BarraNavegacion({ opciones }) {
  return (
    <nav className="navegacion" aria-label="Navegación principal">
      {opciones.map((opcion) => (
        <a
          key={opcion.pagina}
          id={`nav-${opcion.pagina}`}
          href={`#/${opcion.pagina}`}
          className={opcion.activa ? 'navegacion__opcion navegacion__opcion--activa' : 'navegacion__opcion'}
          aria-current={opcion.activa ? 'page' : undefined}
        >
          {opcion.texto}
        </a>
      ))}
    </nav>
  );
}