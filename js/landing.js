function main () {
  const msgUser = document.querySelector('#msg_user');
  const moviesSearch = document.querySelector('#movies_search');
  const moviesContent = document.querySelector('#movies_content');
  const name = window.sessionStorage.getItem('name');
  const btnLoad = document.querySelector('#btn_load');

  btnLoad.addEventListener('click', onLoadMovies);

  if (!name) {
    msgUser.innerHTML = 'USUARIO NO REGISTRADO';
    moviesSearch.classList.add('d-none');
    moviesContent.classList.add('d-none');
    return;
  }
  msgUser.innerHTML = 'Bienvenido: ' + name;

  function onLoadMovies () {
    btnLoad.innerHTML = 'Cargando... <i class="fas fa-sync fa-spin"></i>';
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
        btnLoad.innerHTML = 'Cargar';
        console.log(data);
        procesarPeliculas(data.results);
      })
      .catch( error => {
        console.log(error.message);
      }
      );
  }

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
    const row = document.querySelector('#row_' + idMovie);
    if (row) {
      const html = ` <div class="col-10">
                      <div class="card border-info mb-3" style="max-width: 20rem;">
                        <div class="card-header">
                          <h5>Ver Películas</h5>
                        </div>
                        <div class="card-body">
                          <p class="card-text">Presione para ir a la lista de películas</p>
                          <button type="button" id="btn_ver" class="btn btn-info">Ver</button>
                        </div>
                      </div>
                    </div>
                  </div>`;
      row.innerHTML = html;
      console.log('click en pelicula', idMovie);
    }
  }
}

document.addEventListener('DOMContentLoaded', main);