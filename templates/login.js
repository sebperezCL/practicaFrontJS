export const templateLogin = {
  render: () => {
    let html = `
    <div class="container margin-custom">
      <div class="row justify-content-center">
        <div class="col-6">
          <div class="card border-primary mb-3">
            <div class="card-header">
              <h5>Ingrese sus datos de usuario</h5>
            </div>
            <div class="card-body">
              <form>
                <fieldset>
                  <div class="form-group">
                    <label class="control-label align-custom-label">Username</label>
                    <input type="text" class="form-control tocheck" id="username" placeholder="Ingrese nombre de usuario" required>
                  </div>
                  <div class="form-group">
                    <label id="msg_pwd" class="control-label">Password</label>
                    <input type="password" class="form-control margin-custom-select tocheck" id="password" placeholder="Ingrese su contraseña" required>
                  </div>
                </fieldset>
                <div id="msg_warning" class="alert alert-dismissible alert-warning d-none">
                  <button type="button" class="close" data-dismiss="alert">&times;</button>
                  <h5 class="alert-heading">Atención</h5>
                  <p class="mb-0">Usuario o contraseña incorrecta</p>
                </div>
                <div class="row margin-custom">
                  <div class="col text-center">
                    <button type="submit" id="btn_login" class="btn btn-primary">Login</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    return html;
  }
};