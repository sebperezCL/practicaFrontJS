# Entrega de práctica para el módulo Front End Javascript
# Sebastián Pérez

## Para iniciar

Se puede utilizar live-server para iniciar el proyecto. Simplemente dirigirse al directorio raíz y ejecutar el comando 

```live-server```

Esto iniciará el servidor web cargando la página index.html

### Navegación

La primera opción muestra el formulario de registro. Para poder visualizar las películas es necesario tener una API Key de https://developers.themoviedb.org/3 sin esto no se pueden ver las películas.

Una vez que se haya registrado debe ir a la opción de Login para ingresar al sistema. Si los datos son correctos será dirigido a landing.html en donde podrá cargar la información de las películas (si tiene la API Key).

### Construcción del sitio

El sitio utiliza una página html llamada index, donde son cargados dinámicamente los formularios de registro y login dependiendo de la selección. Estos formularios son cargados desde los archivos template ubicados en la carpeta del mismo nombre. Todo el comportamiento dinámico de esta página se encuentra en /js/app.js

La página de carga de películas es un archivo html independiente que carga contenido dinámicamente utilizando la API key proporcionada por el usuario en el proceso de registro. Si el usuario no hace login esta página no se puede visualizar. Todo el comportamiento dinámico de esta página se encuentra en /js/landing.js

Este sitio utiliza **Bootstrap 4.5** en conjunto con el template **"Minty"**, ubicado en https://bootswatch.com/minty/ 

El CSS del formulario modal fue obtenido de https://codepen.io/colbyalbo/pen/gRogbE