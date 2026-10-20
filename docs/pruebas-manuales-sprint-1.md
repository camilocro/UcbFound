# Pruebas manuales · Sprint 1 · UCBFound

Probado por: Celes (pruebas 1 a 20) y Camilo (pruebas 21 a 28) · Fecha: 20/10/2026 · Navegador: Chrome

Antes de empezar: abrir la app con `npm start` en http://localhost:1234.

| N.º | Historia | Pasos | Resultado esperado | Resultado |
|---|---|---|---|---|
| 1 | HU-01 | Ir a "Regístrate", llenar nombre, correo @ucb.edu.bo y contraseña de 8 caracteres, y presionar "Crear cuenta" | "Cuenta creada correctamente" | ✓ |
| 2 | HU-01 | Registrarse con un correo @gmail.com | "Solo se permiten correos @ucb.edu.bo" | ✓ |
| 3 | HU-01 | Registrarse otra vez con el mismo correo de la prueba 1 | "Este correo ya está registrado" | ✓ |
| 4 | HU-01 | Presionar "Crear cuenta" con algún campo vacío | "Por favor, complete todos los campos" | ✓ |
| 5 | HU-02 | Iniciar sesión con el correo y la contraseña de la prueba 1 | Se ve "Hola, <nombre>" con la sesión iniciada | ✓ |
| 6 | HU-02 | Iniciar sesión con una contraseña incorrecta | "Correo o contraseña no son válidos" | ✓ |
| 7 | HU-02 | Presionar "Iniciar sesión" con los campos vacíos | "Por favor, ingrese correo y contraseña" | ✓ |
| 8 | HU-03 | Con sesión iniciada, presionar "Cerrar sesión" | Vuelve a la pantalla de ingreso | ✓ |
| 9 | HU-03 | Después de cerrar sesión, abrir http://localhost:1234/#/reportar-objeto | Pide iniciar sesión ("Inicia sesión para continuar.") | ✓ |
| 10 | HU-04 | Con sesión iniciada, ir a "Reportar objeto perdido", llenar nombre, descripción y una fecha pasada, y presionar "Reportar" | "Reporte creado correctamente" | ✓ |
| 11 | HU-04 | Presionar "Reportar" sin nombre o sin fecha | "Es necesario ingresar nombre y fecha" | ✓ |
| 12 | HU-04 | Escribir a mano una fecha futura y presionar "Reportar" | "La fecha no puede ser futura" | ✓ |
| 13 | Datos de ejemplo | Ir a "Buscar objetos encontrados" | Aparecen los 6 objetos de ejemplo con foto, nombre y fecha | ✓ |
| 14 | Datos de ejemplo | Recargar la página (F5) y volver a "Buscar objetos encontrados" | Siguen siendo 6, no se duplican | ✓ |
| 15 | HU-07 | Buscar "cargador" | Solo aparece "Cargador de laptop" | ✓ |
| 16 | HU-07 | Buscar "llavero" (está en la descripción) | Aparecen "Llaves" y "Mochila negra" | ✓ |
| 17 | HU-07 | Buscar "paraguas" | "No se encontraron objetos con ese nombre o descripción" | ✓ |
| 18 | HU-07 | Borrar el texto y presionar "Buscar" | Aparecen los 6, del más reciente (Calculadora) al más antiguo (Mochila negra) | ✓ |
| 19 | HU-09 | Presionar "Audífonos" en la lista | Se ve su foto, nombre, descripción y fecha | ✓ |
| 20 | HU-09 | En el detalle, revisar que no aparezca el correo de quien lo encontró | No aparece ningún correo ni dato personal | ✓ |
| 21 | HU-07 | Buscar "audifonos" (sin tilde) | Aparece "Audífonos" | ✓ |
| 22 | HU-07 | Cerrar sesión y abrir http://localhost:1234/#/buscar-objetos | Pide iniciar sesión | ✓ |
| 23 | HU-11 | Ir a "Registrar objeto encontrado", elegir una foto (.jpg o .png), escribir una descripción y presionar "Registrar" | "Objeto registrado correctamente" | ✓ |
| 24 | HU-11 | Presionar "Ver la lista de objetos encontrados" | El objeto de la prueba 23 aparece primero en la lista | ✓ |
| 25 | HU-11 | Presionar "Registrar" sin foto o sin descripción | "Es necesario agregar una foto y una descripción" | ✓ |
| 26 | HU-11 | Elegir un archivo que no es imagen (por ejemplo un .pdf) y presionar "Registrar" | "Solo se permiten imágenes" | ✓ |
| 27 | HU-11 | Registrar un objeto sin escribir el nombre | En la lista aparece como "Objeto encontrado" | ✓ |
| 28 | HU-11 | Cerrar sesión y abrir http://localhost:1234/#/registrar-objeto | Pide iniciar sesión | ✓ |

## Problemas encontrados

| N.º | Problema | Cómo se resolvió |
|---|---|---|
| 1 | Se podía abrir `#/buscar-objetos` sin iniciar sesión | Ahora pide iniciar sesión, igual que las otras páginas internas |
| 2 | Buscar "audifonos" (sin tilde) no encontraba "Audífonos" | La búsqueda ignora las tildes |
| 3 | Dos objetos registrados el mismo día no salían del más reciente al más antiguo | Sale primero el último registrado |