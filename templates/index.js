export const templateIndex = {
  render: () => {
    let html = `
    <div class="container">
        <div class="row text-center">
          <div class="col justify-content-center margin-custom">
              <p>Por favor seleccione una opción</p>
          </div>
        </div>
        <div class="row text-center margin-custom">
          <div class="col d-flex justify-content-center">
            <div class="card border-primary mb-3" style="max-width: 20rem;">
              <div class="card-header">
                <h5>Registro</h5>
              </div>
              <div class="card-body">
                <p class="card-text">Presione acá para ir al registro</p>
                <button type="button" id="btn_register" class="btn btn-primary">Registro</button>
              </div>
            </div>
          </div>
          <div class="col d-flex justify-content-center">
            <div class="card border-secondary mb-3" style="max-width: 20rem;">
              <div class="card-header">
                <h5>Login</h5>
              </div>
              <div class="card-body">
                <p class="card-text">Presione acá para ir al login</p>
                <button type="button" id="btn_login" class="btn btn-secondary">Login</button>
              </div>
            </div>
          </div>
          <div class="col d-flex justify-content-center">
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
        </div>
    </div>
    `;
    return html;
  }
};