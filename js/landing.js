function main () {
  let queryPage = 1;
  const msgUser = document.querySelector('#msg_user');
  const msgSearch = document.querySelector('#msg_search');
  const moviesSearch = document.querySelector('#movies_search');
  const moviesContent = document.querySelector('#movies_content');
  const name = window.sessionStorage.getItem('name');
  const apikey = window.sessionStorage.getItem('apikey');
  const btnLoad = document.querySelector('#btn_load');
  const btnPrev = document.querySelector('#btn_prev');
  const btnNext = document.querySelector('#btn_next');
  const modalDetails = document.querySelector('#modal_details');
  const modalClose = document.querySelector('.ebcf_close');
  let rutaBase = '';
  // Si el usuario no está logueado no muestra nada
  if (!name) {
    msgUser.innerHTML = 'USUARIO DESCONOCIDO';
    moviesSearch.classList.add('d-none');
    moviesContent.classList.add('d-none');
    return;
  }

  // Cargamos la ruta base indicada por la API para las imágenes
  const urlConfig = 'https://api.themoviedb.org/3/configuration?api_key=' + apikey;
  fetch(urlConfig)
    .then( resp => {
      if (resp.status < 200 || resp.status >= 300) {
        throw new Error('HTTP Error ' + resp.status);        }
      return resp.json();
    })
    .then( data => {
      rutaBase = data.images.base_url;
    })
    .catch( error => {
      console.log(error.message);
      msgSearch.innerHTML = 'Resultados - Error al cargar resultados';
      msgSearch.classList.add('text-danger');
    });


  // Eventos para cerrar el modal cuando corresponda
  window.addEventListener('click', (ev) => { // cerrar modal con click afuera de la ventana
    if (ev.target == modalDetails) {
      modalDetails.classList.remove('d-block');
      modalDetails.classList.add('d-none');
    }
  });

  modalClose.addEventListener('click', () => {
    modalDetails.classList.remove('d-block');
    modalDetails.classList.add('d-none');
  });

  // Evento para la carga de películas
  btnLoad.addEventListener('click', onLoadMovies);

  moviesContent.classList.add('invisible');

  msgUser.innerHTML = 'Bienvenido: ' + name;

  function onLoadMovies () {
    btnLoad.innerHTML = 'Cargando... <i class="fas fa-sync fa-spin"></i>';
    moviesContent.classList.remove('invisible');

    // Buscar películas
    // https://api.themoviedb.org/3/discover/movie?api_key=e8aa0b8b063fec77d145025c9a5aa4c1&language=es-ES&sort_by=popularity.desc&page=1

    // Obtener la configuración de rutas
    // https://api.themoviedb.org/3/configuration?api_key=e8aa0b8b063fec77d145025c9a5aa4c1

    // Carga la primera página del listado de películas
    loadMovies(1);
    btnPrev.addEventListener('click', () => {
      loadMovies(queryPage-1);
      queryPage--;
    });
    btnNext.addEventListener('click', () => {
      loadMovies(queryPage+1);
      queryPage++;
    });
  }

  function loadMovies (page) {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apikey + '&language=es-ES&sort_by=popularity.desc&page=' + page;
    fetch(url)
      .then( resp => {
        if (resp.status < 200 || resp.status >= 300) {
          throw new Error('HTTP Error ' + resp.status);        }
        return resp.json();
      })
      .then( data => {
        btnLoad.innerHTML = 'Cargar';
        console.log(data);
        msgSearch.innerHTML = 'Resultados - Página ' + page;
        msgSearch.classList.remove('text-danger');
        procesarPeliculas(data.results);
        if (queryPage == 1) {
          btnPrev.classList.add('invisible');
        } else {
          btnPrev.classList.remove('invisible');
        }
      })
      .catch( error => {
        console.log(error.message);
        msgSearch.innerHTML = 'Resultados - Error al cargar resultados';
        msgSearch.classList.add('text-danger');
      });
  }

  // Carga la lista de películas en la tabla de resultados
  function procesarPeliculas (movies) {
    const resultsTable = document.querySelector('#results_table');
    let html = '';
    movies.forEach(item => {
      html += ` <tr id="row_${item.id}">
                  <th scope="row">${item.id}</th>
                  <td>${item.title}</td>
                  <td>${item.release_date}</td>
                  <td><button type="button" id="btn_${item.id}" class="btn btn-primary btn-sm btn-detalle">Ver Detalles</button></td>
                </tr>`;
    });
    resultsTable.innerHTML = html;

    document.querySelectorAll('.btn-detalle').forEach(item => {
      item.addEventListener('click', onClickDetalle);
    });
  }

  function onClickDetalle (ev) {
    const idMovie = ev.target.id.replace('btn_', '');
    const movieDetail = document.querySelector('#movie_detail');
    // Ver detalles película
    const url = 'https://api.themoviedb.org/3/movie/' + idMovie + '?api_key=' + apikey + '&language=es-ES';

    fetch(url)
      .then( resp => {
        if (resp.status < 200 || resp.status >= 300) {
          throw new Error('HTTP Error ' + resp.status);        }
        return resp.json();
      })
      .then( data => {
        console.log(data);
        if (movieDetail) {
          const html = `<div class="card border-primary mb-3">
                          <div class="card-header">
                            <h5>Película: ${data.title}</h5>
                          </div>
                          <div class="card-body">
                            <h5 class="card-title">Detalles</h5>
                            <div class="row">
                              <div class="col text-center mb-4 mt-3">
                                <img src="${rutaBase}w185${data.poster_path}" alt="movie poster">
                              </div>
                            </div>
                            <p class="card-text text-justify">${data.overview}</p>
                            <div class="row">
                              <div class="col">
                                <span>Popularidad: ${data.popularity}</span>
                              </div>
                              <div class="col">
                                <span>Fecha: ${data.release_date}</span>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col">
                                <span>Voto promedio: ${data.vote_average}</span>
                              </div>
                              <div class="col">
                                <span>Status: ${data.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>`;
          movieDetail.innerHTML = html;
          console.log('click en pelicula', idMovie);
          document.querySelector('#modal_details').classList.add('d-block');
        }
      })
      .catch( error => {
        console.log(error.message);
        msgSearch.innerHTML = 'Resultados - Error al cargar resultados';
        msgSearch.classList.add('text-danger');
      }
      );
  }
}

document.addEventListener('DOMContentLoaded', main);