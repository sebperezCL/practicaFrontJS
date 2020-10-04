function main () {
  const msg_user = document.querySelector('#msg_user');
  const movies_content = document.querySelector('#movies_content');
  const name = window.sessionStorage.getItem('name');
  const btn_load = document.querySelector('#btn_load');

  btn_load.addEventListener('click', onLoadMovies);

  if (!name) {
    msg_user.innerHTML = 'USUARIO NO REGISTRADO';
    movies_content.classList.add('d-none');
    return;
  }
  msg_user.innerHTML = 'Bienvenido: ' + name;

  function onLoadMovies () {
    btn_load.innerHTML = 'Cargando... <i class="fas fa-sync fa-spin"></i>';
    //e8aa0b8b063fec77d145025c9a5aa4c1
    // https://api.themoviedb.org/3/

    // Buscar películas
    // https://api.themoviedb.org/3/discover/movie?api_key=e8aa0b8b063fec77d145025c9a5aa4c1&language=es-ES&sort_by=popularity.desc&page=1

    // Ver detalles película
    // https://api.themoviedb.org/3/movie/497582?api_key=e8aa0b8b063fec77d145025c9a5aa4c1&language=es-ES

    // Obtener la configuración de rutas
    // https://api.themoviedb.org/3/configuration?api_key=e8aa0b8b063fec77d145025c9a5aa4c1

    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=e8aa0b8b063fec77d145025c9a5aa4c1&language=es-ES&sort_by=popularity.desc&page=1';
    fetch(url)
      .then( resp => {
        if (resp.status < 200 || resp.status >= 300) {
          throw new Error('HTTP Error ' + resp.status);        }
        return resp.json();
      })
      .then( data => {
        btn_load.innerHTML = 'Cargar';
        console.log(data);
      })
      .catch( error => {
        console.log(error.message);
      }
      );
  }
}

document.addEventListener('DOMContentLoaded', main);