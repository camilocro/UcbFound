const CLAVE_USUARIOS = 'ucbfound_usuarios';

// Clase porque guarda estado: el almacenamiento donde viven los usuarios
export class RepositorioUsuarios {
  constructor(almacenamiento) {
    this.almacenamiento = almacenamiento;
  }

  obtenerTodos() {
    const textoGuardado = this.almacenamiento.getItem(CLAVE_USUARIOS);
    return textoGuardado ? JSON.parse(textoGuardado) : [];
  }

  obtenerCorreos() {
    return this.obtenerTodos().map((usuario) => usuario.correo);
  }

  guardar(usuario) {
    const usuarios = this.obtenerTodos();
    usuarios.push(usuario);
    this.almacenamiento.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios));
  }
}