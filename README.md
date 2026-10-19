# UCBFound

![Pruebas](https://github.com/camilocro/UcbFound/actions/workflows/integrate.yml/badge.svg)

Sistema web de objetos perdidos y encontrados para la comunidad de la UCB.
Proyecto de Ingeniería de Software.

## Requisitos

- Node.js 20 o superior
- Git

## Instalar y correr

```bash
npm install
npm start
npm test
```

`npm start` abre la app en http://localhost:1234 y `npm test` corre las pruebas unitarias.

## Estructura (MVP)

```
src/model       Reglas del negocio y repositorios (con pruebas)
src/presenter   Conecta la vista con el modelo (con pruebas)
src/view        Pantallas en React
src/main.jsx    Arranque de la app
```

## Equipo

Naza, Majo, Celes y Camilo.