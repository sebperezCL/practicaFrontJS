export const templateRegister = {
  render: () => {
    let html = `
    <div class="container margin-custom">
      <div class="row justify-content-center">
        <div class="col-10">
          <div class="card border-primary mb-3">
            <div class="card-header">
              <h5>Ingrese los datos para el registro</h5>
            </div>
            <div class="card-body">
              <form>
                <fieldset>
                  <legend class="h5">Datos Personales</legend>
                  <div class="form-group">
                    <label for="i_name">Nombre y Apellidos</label>
                    <input type="text" class="form-control tocheck" id="i_name" placeholder="Ingrese nombre completo" required>
                  </div>
                  <label class="control-label">Género</label>
                  <div class="form-group d-flex">
                    <div class="custom-control custom-radio custom-padding-right">
                      <input type="radio" id="radioHombre" name="genero" class="custom-control-input tocheck" required>
                      <label class="custom-control-label" for="radioHombre">Hombre</label>
                    </div>
                    <div class="custom-control custom-radio custom-padding-right">
                      <input type="radio" id="radioMujer" name="genero" class="custom-control-input tocheck">
                      <label class="custom-control-label" for="radioMujer">Mujer</label>
                    </div>
                    <div class="custom-control custom-radio custom-padding-right">
                      <input type="radio" id="radioOtro" name="genero" class="custom-control-input tocheck">
                      <label class="custom-control-label" for="radioOtro">Otro</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <label class="control-label">Nacionalidad</label>
                    </div>
                    <div class="col">
                      <label class="control-label align-custom-label">Provincia</label>
                    </div>
                  </div>
                  <div class="form-group d-flex">
                    <select id="select_nac" class="custom-select margin-custom-select tocheck" required>
                      <option></option>
                      <option value="esp">Española</option>
                      <option value="otro">Otra</option>
                    </select>
                    <select disabled id="select_prov" class="custom-select">
                      <option selected="" disabled>Seleccione</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="i_phone">Teléfono móvil</label>
                    <input type="text" class="form-control tocheck" id="i_phone" placeholder="Ingrese en formato +34 999 999 999" required>
                  </div>
                </fieldset>
                <fieldset>
                  <legend class="h5">Datos de acceso</legend>
                  <div class="row">
                    <div class="col">
                      <label class="control-label">Email</label>
                    </div>
                    <div class="col">
                      <label class="control-label align-custom-label">Username</label>
                    </div>
                  </div>
                  <div class="form-group d-flex">
                      <input type="email" class="form-control margin-custom-select tocheck" id="i_email" placeholder="Ingrese su correo usuario@correo.com" required>
                      <input type="text" class="form-control tocheck" id="i_username" placeholder="Ingrese nombre de usuario" required>
                  </div>
                  <div class="row">
                    <div class="col">
                      <label class="control-label">Password</label>
                    </div>
                    <div class="col">
                      <label class="control-label align-custom-label">Confirmar Password</label>
                    </div>
                  </div>
                  <div class="form-group d-flex">
                      <input type="password" class="form-control margin-custom-select tocheck" id="i_password" placeholder="Ingrese su contraseña" required>
                      <input type="password" class="form-control tocheck" id="i_password_confirm" placeholder="Repita su contraseña" required>
                  </div>
                  <div class="form-group">
                    <label for="i_apikey">API Key</label>
                    <input type="text" class="form-control tocheck" id="i_apikey" placeholder="Ingrese la clave para la API" required>
                  </div>
                </fieldset>
                <fieldset>
                  <legend class="h5">Otros</legend>
                  <div class="form-group">
                    <label for="i_apikey">API Key</label>
                    <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
                  </div>
                  <div class="form-check">
                    <label id="chk_condiciones" class="form-check-label">
                      <input class="form-check-input tocheck" type="checkbox" id="chk_condiciones" required>
                      Acepto las condiciones del sitio
                    </label>
                  </div>
                </fieldset>
                <div class="row margin-custom">
                  <div class="col text-center">
                    <button type="submit" id="btn_submit_register" class="btn btn-primary">Registro</button>
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