# Pruebas manuales · Sprint 2 · UCBFound

Probado por: Celes · Fecha: __/11/2026 · Navegador: Chrome

Antes de empezar:
- Abrir la app con `npm start` y entrar a http://localhost:1234 en una **ventana de incógnito** (Ctrl + Shift + N). Así se empieza sin datos guardados y salen solo los 6 objetos de ejemplo.
- Se usan tres cuentas. Crearlas en "Regístrate", con cualquier contraseña de 8 caracteres:
  - **Cuenta 1:** Juan Pérez · juan.perez@ucb.edu.bo
  - **Cuenta 2:** Ana Prueba · ana.prueba@ucb.edu.bo
  - **Encargado:** Encargado UCB · encargado.objetos@ucb.edu.bo
- Las pruebas van en orden, porque algunas usan lo que se hizo en las anteriores.

| N.º | Historia | Pasos | Resultado esperado | Resultado |
|---|---|---|---|---|
| 1 | HU-13 | Con la Cuenta 1, ir a "Registrar objeto encontrado", poner foto y descripción, elegir un bloque, no elegir categoría y presionar "Registrar" | "Es necesario elegir una categoría" | |
| 2 | HU-12 | Mismo formulario, ahora con categoría pero sin bloque, y presionar "Registrar" | "Es necesario indicar el bloque donde lo encontraste" | |
| 3 | HU-20 | Llenar todo bien, escribir el celular "61234" y presionar "Registrar" | "Ingrese un número de celular válido" | |
| 4 | HU-20 | Cambiar el celular a "7123abcd" y presionar "Registrar" | "Ingrese un número de celular válido" | |
| 5 | HU-12, HU-13, HU-20 | Registrar "Billetera café" con foto, descripción, categoría "Documentos y tarjetas", bloque "Tupuraya 2 - Bloque A", aula "A-204" y celular "71234567" | "Objeto registrado correctamente" | |
| 6 | HU-20 | Registrar otro objeto ("Paraguas negro", categoría "Otros", bloque "Tupuraya 1 - Biblioteca") sin aula y sin celular | "Objeto registrado correctamente" | |
| 7 | HU-12, HU-13 | Ir a "Buscar objetos encontrados" y presionar "Billetera café" | El detalle muestra la categoría "Documentos y tarjetas" y el lugar "Tupuraya 2 - Bloque A, A-204" | |
| 8 | HU-12 | Volver y presionar "Paraguas negro" | El lugar dice solo "Tupuraya 1 - Biblioteca" | |
| 9 | HU-09 | En el detalle de cualquier objeto, buscar el correo o el celular de quien lo encontró | No aparece ningún correo ni celular | |
| 10 | HU-08 | En la búsqueda, abrir la lista "Filtrar por categoría" | Sale "Todas" y las 8 categorías | |
| 11 | HU-08 | Elegir "Electrónica" sin escribir texto | Solo salen "Calculadora", "Audífonos" y "Cargador de laptop", en ese orden | |
| 12 | HU-08 | Elegir "Mochilas y bolsos" y buscar "negra" | Solo sale "Mochila negra" | |
| 13 | HU-08 | Elegir "Llaves" y buscar "cargador" | "No se encontraron objetos con ese nombre, descripción o categoría" | |
| 14 | HU-08 | Volver a "Todas" y borrar el texto | Salen todos los objetos, del más reciente al más antiguo | |
| 15 | HU-10 | Abrir "Audífonos", presionar "Reclamar objeto" y luego "Enviar solicitud" sin escribir nada | "Es necesario explicar por qué el objeto es tuyo" | |
| 16 | HU-10 | Escribir una explicación y presionar "Enviar solicitud" | "Solicitud enviada. Un encargado la revisará" y el formulario se oculta | |
| 17 | HU-10 | Volver a la lista, abrir "Audífonos" otra vez y enviar otra solicitud | "Ya enviaste una solicitud para este objeto" | |
| 18 | HU-10 | Abrir "Billetera café", que registró la Cuenta 1, y enviar una solicitud | "No puedes reclamar un objeto que tú registraste" | |
| 19 | HU-05 | Ir a "Reportar objeto perdido", llenar nombre y fecha, no elegir bloque y presionar "Reportar" | "Es necesario indicar el bloque donde lo perdiste" | |
| 20 | HU-16 | Llenar todo bien, escribir el celular "51234567" y presionar "Reportar" | "Ingrese un número de celular válido" | |
| 21 | HU-05, HU-16 | Reportar "Calculadora" con fecha de ayer, bloque "Tupuraya 1 - Bloque B", aula "B-305" y celular "71234567" | "Reporte creado correctamente" | |
| 22 | HU-05 | Reportar "Chompa azul" con una fecha de la semana pasada, solo con el bloque "Tupuraya 2 - Canchas" y sin celular | "Reporte creado correctamente" | |
| 23 | HU-17 | Volver a la pantalla principal y ver "Mis reportes" | Salen "Calculadora" y luego "Chompa azul" (de la más reciente a la más antigua), las dos con el estado "Buscando" | |
| 24 | HU-17 | Presionar "Calculadora" en "Mis reportes" | Se abre su detalle con el lugar "Tupuraya 1 - Bloque B, B-305", la descripción y el celular | |
| 25 | HU-21 | En la pantalla principal, ver "Objetos que encontré" | Salen "Billetera café" y "Paraguas negro" con el estado "Por recibir" | |
| 26 | HU-17, HU-21 | Cerrar sesión y entrar con la Cuenta 2 | "Todavía no reportaste ningún objeto perdido" y "Todavía no registraste ningún objeto encontrado". No sale nada de la Cuenta 1 | |
| 27 | HU-14 | Con la Cuenta 2, revisar la pantalla principal | No aparece el botón "Ver objetos guardados" | |
| 28 | HU-14 | Con la Cuenta 2, abrir http://localhost:1234/#/objetos-guardados | Lleva a la pantalla principal | |
| 29 | HU-14 | Cerrar sesión y abrir http://localhost:1234/#/objetos-guardados | Pide iniciar sesión | |
| 30 | HU-14 | Entrar con la cuenta del Encargado | En la pantalla principal aparece "Ver objetos guardados" | |
| 31 | HU-14 | Presionar "Ver objetos guardados" | Salen todos los objetos, del más reciente al más antiguo, con su lugar y el correo de quien lo encontró | |
| 32 | HU-15 | En "Billetera café", presionar "Registrar quién lo recogió", poner solo el nombre y presionar "Registrar entrega" | "Es necesario ingresar el nombre y el carnet de quien recoge" | |
| 33 | HU-15 | Poner el nombre "Juan Pérez" y el carnet "1234567" y presionar "Registrar entrega" | "Entrega registrada correctamente" y "Billetera café" sale de la lista | |
| 34 | HU-15 | Recargar la página (F5) y volver a "Ver objetos guardados" | "Billetera café" sigue sin aparecer | |
| 35 | Arreglo búsqueda | Ir a "Buscar objetos encontrados" | "Billetera café" ya no aparece, porque ya fue entregada | |
| 36 | HU-21 | Cerrar sesión, entrar con la Cuenta 1 y ver "Objetos que encontré" | "Billetera café" tiene el estado "Entregado" y "Paraguas negro" sigue en "Por recibir" | |
| 37 | Apariencia | Ir a "Buscar objetos encontrados" | Arriba de la lista dice cuántos objetos se encontraron, y cada objeto tiene descripción y una flecha › | |
| 38 | Apariencia | Buscar "mochila" | Dice "1 objeto encontrado" | |
| 39 | Apariencia | Abrir un objeto | Arriba sale "‹ Volver a la lista", la categoría va en una etiqueta y la fecha y el lugar en dos cuadritos | |
| 40 | Apariencia | Buscar "zzz" y presionar "Reportar como perdido" | El aviso sale con el azul y el amarillo de la UCB, y el botón lleva al formulario de reporte | |
| 41 | Apariencia | F12 → Ctrl + Shift + M → elegir "iPhone SE" y revisar la búsqueda y el detalle | El botón "Buscar" queda debajo del campo, y la fecha y el lugar quedan uno debajo del otro | |

## Problemas encontrados

| N.º | Problema | Cómo se resolvió |
|---|---|---|
| 1 | Un objeto ya entregado seguía apareciendo en "Buscar objetos encontrados" y se podía reclamar | Se ocultan de la búsqueda los objetos ya recogidos (PR #44) |
| 2 | El aviso "sin resultados" usaba colores sueltos y no los de la UCB | Ahora usa las variables `--azul` y `--amarillo` |