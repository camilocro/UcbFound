export default function DetalleObjeto({ objeto, alVolver }) {
  return (
    <section id="detalle-objeto" className="tarjeta">
      <img className="detalle__foto" src={objeto.foto} alt={objeto.nombre} />
      <h1 className="tarjeta__titulo">{objeto.nombre}</h1>
      <p className="detalle__dato">
        <strong>Descripción:</strong> {objeto.descripcion}
      </p>
      <p className="detalle__dato">
        <strong>Fecha en que se encontró:</strong> {objeto.fecha}
      </p>
      <button id="volver-lista-button" type="button" className="enlace" onClick={alVolver}>
        Volver a la lista
      </button>
    </section>
  );
}