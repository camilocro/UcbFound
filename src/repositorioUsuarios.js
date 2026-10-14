const CLAVE = 'ucbfound_usuarios';

// Clase porque guarda estado: el almacenamiento donde viven los usuarios
export class RepositorioUsuarios {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerUsuarios() {
    const datos = this.almacenamiento.getItem(CLAVE);
    return datos ? JSON.parse(datos) : [];
  }

  obtenerCorreos() {
    return this.obtenerUsuarios().map((usuario) => usuario.correo);
  }

  guardar(usuario) {
    const usuarios = this.obtenerUsuarios();
    usuarios.push(usuario);
    this.almacenamiento.setItem(CLAVE, JSON.stringify(usuarios));
  }
}