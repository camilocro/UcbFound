const CLAVE_REPORTES = 'ucbfound_objetos_perdidos';

export class RepositorioReportes {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerTodos() {
    const textoGuardado = this.almacenamiento.getItem(CLAVE_REPORTES);
    return textoGuardado ? JSON.parse(textoGuardado) : [];
  }

  obtenerReportesDe(correo) {
    return this.obtenerTodos().filter((reporte) => reporte.correoDelDueno === correo);
  }

  guardar(reporte) {
    const reportes = this.obtenerTodos();
    reportes.push(reporte);
    this.almacenamiento.setItem(CLAVE_REPORTES, JSON.stringify(reportes));
  }
}