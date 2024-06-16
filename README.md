# tesis-frontend
Muestra al público del proyecto de Front-End de la tesis que estoy desarrollando como mi trabajo de graduación

## Uso de variables de entorno

Para crear la variable con la URL de la API, solo se debe crear el archivo `.env`, y escribir `API_URL=<link_to_API>`.
Esta variable se podría acceder mediante uno de los archivos `environment` contenidos en `src/environments`. Estos archivos se podrán crear automáticamente ejecutando `set-env.js` (con esto se armarían los archivos environment con las variables de entorno escritas en .env). Se puede hacer esto manualmente con `node ./set-env.js` o, si se quiere ejecutar esto al levantar el servidor, ejecutar `npm start`.

Luego de esto, para acceder a las variables de entorno, se debe importar uno de los objetos environment en el archivo en el que queramos usarlas.