export default function SinResultados({ mensaje, alReportar }) {
  return (
    <div className="sin-resultados" role="status">
      <svg
        className="sin-resultados__icono"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M15 32L50 15L85 32V72L50 90L15 72V32Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M15 32L50 50L85 32M50 50V90M32 24L68 42"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <circle
          cx="70"
          cy="69"
          r="15"
          fill="white"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M81 80L91 90"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      <h2 className="sin-resultados__titulo">{mensaje}</h2>

      <p>¿Quieres reportarlo como perdido?</p>

      <button type="button" className="sin-resultados__boton" onClick={alReportar}>
        Reportar como perdido
      </button>
    </div>
  );
}