const CLAVE_REPORTES = 'ucbfound_objetos_perdidos';

export class RepositorioReportes {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerReportes() {
    const textoGuardado = this.almacenamiento.getItem(CLAVE_REPORTES);
    return textoGuardado ? JSON.parse(textoGuardado) : [];
  }

  obtenerReportesDe(correo) {
    return this.obtenerReportes().filter((reporte) => reporte.correoDelDueno === correo);
  }

  guardar(reporte) {
    const reportes = this.obtenerReportes();
    reportes.push(reporte);
    this.almacenamiento.setItem(CLAVE_REPORTES, JSON.stringify(reportes));
  }
}