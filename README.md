<div align="center">
  <img src="app/assets/images/logo.png" href="https://app.rankmi.com" width="33%"/>
</div>

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Coverage Status](https://coveralls.io/repos/github/Rankmi/app/badge.svg?branch=development&t=eo1yjl)](https://coveralls.io/github/Rankmi/app?branch=development)
[![Build Status](https://travis-ci.com/Rankmi/app.svg?token=SJB5xS8GHzjGx4R5kiKa&branch=master)](https://travis-ci.com/Rankmi/app)

## Tabla de contenidos:

1.  [Instalación](#installation)
    - Habilitar dominios personalizados [OSX](https://gist.github.com/ogrrd/5831371)
2.  [Variables de entorno indispensables](#environments)
3.  [Api Traducciones](#translations)

<a name="installation"></a>

## Instalación

## 1.1 Requisitos:

Nodejs >=10.24.0 & <= 11.15.0

1.  Clonar el proyecto
2.  Correr el comando `npm install`
3.  Agregar un archivo .env a la raíz del proyecto cuyo conteniedo sera el del archivo de env.example que se encuentra en la raiz del proyecto.
4.  Correr el comando `npm start`

<a name="environments"></a>

## Detalle variables de entorno indispensables

- API_URL
  - Comentario: Debe apuntar al api con la versión 'v1' asociada a ese ambiente
  - Value de Ejemplo: https://hub.rankmi.com/sandbox/v1
- NON_VERSIONED_API_URL
  - Comentario: Debe apuntar al api-- quitando el 'v1'-- asociada a ese ambiente
  - Value de Ejemplo: https://hub.rankmi.com/sandbox/v1
- APP_ID
  - Comentario: En caso de que no esta key no corresponda al valor seteado por el API en el ambiente en config/environments/<evironmentName>, el api retornará un status code 403
  - Value de Ejemplo: aoretusruteosar // lo que sea que tenga el api de acuerdo al ambiente
- APP_HOSTNAME
  - Comentario: Debe contener la url completa del ambiente desplegado, excluyendo el https
  - Value de Ejemplo: performance.rankmi.com // quitar 'https://' de dónde esté montando el ambiente
- APP_URL
  - Comentario: Debe contener la url completa del ambiente desplegado
  - Value de Ejemplo: https://performance.rankmi.com
- DEFAULT_SUBDOMAIN
  - Comentario: Debe contener el subdominio donde se despliegue la aplicación
  - Value de ejemplo: performance // si es que la url de la aplicación es https://performance.rankmi.com

<a name="translations"></a>

## API de traducciones

1. Clonar el [repositorio](https://github.com/Rankmi/translations-api)
2. Seguir las instrucciones del readme del repositorio
3. Agregar las [variables de entorno](#environment-variables) asociadas a la API de traducciones
4. Subir los commons a la api de traducciones local (`npm run translations:upload`)
   <a name="environments"></a>
