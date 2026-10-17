const CLAVE = 'ucbfound_objetos_perdidos';

export class RepositorioReportes {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerReportes() {
    const datos = this.almacenamiento.getItem(CLAVE);
    return datos ? JSON.parse(datos) : [];
  }

  obtenerReportesDe(correo) {
    return this.obtenerReportes().filter((reporte) => reporte.correoDelDueno === correo);
  }

  guardar(reporte) {
    const reportes = this.obtenerReportes();
    reportes.push(reporte);
    this.almacenamiento.setItem(CLAVE, JSON.stringify(reportes));
  }
}