export class DetalleObjetoPresenter {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  verDetalle(id) {
    return this.repositorio.buscarPorId(id).obtenerVistaBasica();
  }
}