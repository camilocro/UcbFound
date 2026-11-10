const CLAVE_USUARIOS = 'ucbfound_usuarios';

// Clase porque guarda estado: el almacenamiento donde viven los usuarios
export class RepositorioUsuarios {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerUsuarios() {
    const textoGuardado = this.almacenamiento.getItem(CLAVE_USUARIOS);
    return textoGuardado ? JSON.parse(textoGuardado) : [];
  }

  obtenerCorreos() {
    return this.obtenerUsuarios().map((usuario) => usuario.correo);
  }

  guardar(usuario) {
    const usuarios = this.obtenerUsuarios();
    usuarios.push(usuario);
    this.almacenamiento.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  }
}