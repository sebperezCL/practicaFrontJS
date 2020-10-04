import { templateIndex } from '../templates/index.js';
import { templateRegister } from '../templates/register.js';
import { templateLogin } from '../templates/login.js';

function main () {
  const mainSection = document.querySelector('#main-landing');
  mainSection.innerHTML = templateIndex.render();

  const btnRenderRegister = document.querySelector('#btn_register');
  const btnRenderLogin = document.querySelector('#btn_login');
  const btnRenderVer = document.querySelector('#btn_ver');

  if (btnRenderRegister) {
    btnRenderRegister.addEventListener('click', onRenderRegistro);
  }

  if (btnRenderLogin) {
    btnRenderLogin.addEventListener('click', onRenderLogin);
  }

  if (btnRenderVer) {
    btnRenderVer.addEventListener('click', () => {
      window.location = 'landing.html';
    });
  }

  function onRenderRegistro () {
    mainSection.innerHTML = templateRegister.render();

    // Selecciono elementos del nuevo formulario
    const btnRegister = document.querySelector('#btn_submit_register');
    const selectNac = document.querySelector('#select_nac');

    // Defino los eventos para los elementos
    if (selectNac) { selectNac.addEventListener('change', onSelectNac); }
    if (btnRegister) { btnRegister.addEventListener('click', onRegistrar); }
  }

  function onRegistrar(ev) {
    ev.preventDefault();
    const form = document.querySelector('form');
    const inputs = [...form.querySelectorAll('.tocheck')];

    if (!validarForm(form, inputs)) {
      return;
    }

    // Revisar si la contraseña se ingresó bien al momento de confirmarla
    const msgPwd = document.querySelector('#msg_pwd');
    // Selecciono los input password de esta forma ya que la longitud del array puede variar
    // dependiendo si el usuario escogió nacionalidad española o no
    const iPwd = inputs.find(item => item.id === 'password');
    const iPwdConfirm = inputs.find(item => item.id === 'password_confirm');
    if (!(iPwd.value === iPwdConfirm.value)) {
      iPwd.classList.add('is-invalid');
      iPwdConfirm.classList.add('is-invalid');
      msgPwd.innerHTML = 'Password' + ' - las contraseñas no coinciden';
      msgPwd.classList.add('text-danger');
      console.dir('error pwd');
      return;
    }
    // Limpio los mensajes
    msgPwd.innerHTML = 'Password';
    msgPwd.classList.remove('text-danger');
    iPwd.classList.remove('is-invalid');
    iPwdConfirm.classList.remove('is-invalid');

    // Guardo datos en Local Storage
    const user = {};
    user.name = inputs.find(item => item.id === 'name').value;
    user.genero = inputs.filter(item => item.type == 'radio').find(item => item.checked).value;
    user.nacionalidad = inputs.find(item => item.id === 'select_nac').value;
    if (user.nacionalidad == 'esp') {user.provincia = inputs.find(item => item.id === 'select_prov').value;}
    user.telefono = inputs.find(item => item.id === 'phone').value;
    user.email = inputs.find(item => item.id === 'email').value;
    user.username = inputs.find(item => item.id === 'username').value;
    user.password = inputs.find(item => item.id === 'password').value;
    user.apikey = inputs.find(item => item.id === 'apikey').value;
    user.comentarios = document.querySelector('#comentarios').value;


    console.log(user);
    const usersDB = window.localStorage.getItem('usersDB') ? JSON.parse(window.localStorage.getItem('usersDB')) : [];
    usersDB.push(user);
    window.localStorage.setItem('usersDB', JSON.stringify(usersDB));
    console.log('Registrado');
    window.location = 'index.html';
  }

  function onSelectNac (ev) {
    const msgError = document.querySelector('#msg_fetcherror');
    const spinner = document.querySelector('#spinner');
    msgError.classList.add('invisible');
    msgError.innerHTML = '';
    spinner.classList.add('invisible');
    // Si elige nacionalidad española entonces cargamos las provincias de la API
    if (ev.target.value === 'esp') {
      const url = 'https://datos.gob.es/apidata/nti/territory/Province?_sort=label&_pageSize=60&_page=0';
      spinner.classList.remove('invisible');
      fetch(url)
        .then( resp => {
          if (resp.status < 200 || resp.status >= 300) {
            throw new Error('HTTP Error ' + resp.status);        }
          return resp.json();
        })
        .then( data => {
          spinner.classList.add('invisible');
          cargaProvincias(data.result.items);
        })
        .catch( error => {
          console.log(error.message);
          msgError.classList.remove('invisible');
          msgError.innerHTML = 'Error al recuperar la información de provincias';
        }
        );
    } else {
      const selectProv = document.querySelector('#select_prov');
      selectProv.removeAttribute('required');
      selectProv.setAttribute('disabled', true);
      selectProv.classList.remove('tocheck');
      selectProv.classList.remove('is-invalid');
    }
  }

  // Construimos el select de provincias
  function cargaProvincias (data) {
    const selectProv = document.querySelector('#select_prov');
    selectProv.setAttribute('required', true);
    selectProv.removeAttribute('disabled');
    selectProv.classList.add('tocheck');
    if (selectProv) {
      let html = '<option></option>';
      data.forEach(item => {
        html += `<option value="${item.label}">${item.label}</option>`;
      });
      selectProv.innerHTML = html;
    }
  }

  function onRenderLogin () {
    mainSection.innerHTML = templateLogin.render();
    const btnLogin = document.querySelector('#btn_login');

    if (btnLogin) {
      btnLogin.addEventListener('click', onLogin);
    }
  }

  function onLogin (ev) {
    ev.preventDefault();

    const form = document.querySelector('form');
    const inputs = [...form.querySelectorAll('.tocheck')];
    const msgWarning = document.querySelector('#msg_warning');
    msgWarning.classList.add('d-none');

    if (!validarForm(form, inputs)) {
      return;
    }

    const user = inputs.find(item => item.id == 'username').value;
    const pwd = inputs.find(item => item.id == 'password').value;

    console.log(user, ' - ', pwd);

    const usersDB = window.localStorage.getItem('usersDB') ? JSON.parse(window.localStorage.getItem('usersDB')) : [];
    if (usersDB) {
      const userFound = usersDB.find(item => item.username == user);
      if (!userFound || userFound.password != pwd) {
        msgWarning.classList.remove('d-none');
        return;
      }
      window.sessionStorage.setItem('username', userFound.username);
      window.sessionStorage.setItem('name', userFound.name);
      window.sessionStorage.setItem('apikey', userFound.apikey);
      window.location = 'landing.html';
    }
  }

  function validarForm (form, inputs) {
    if (!form.checkValidity()) {
      inputs.forEach(item => {
        if (!item.checkValidity()) {
          console.log(`Elemento inválido id: ${item.id} de tipo ${item.getAttribute('type')}`);
          if (item.getAttribute('type') === 'checkbox') {
            item.parentElement.classList.add('text-danger');
          }
          item.classList.add('is-invalid');
        } else {
          item.classList.add('is-valid');
          item.classList.remove('is-invalid');
          if (item.getAttribute('type') === 'checkbox') {
            item.parentElement.classList.remove('text-danger');
            item.parentElement.classList.add('text-success');
          }
        }
      });
      return false;
    }
    return true;
  }
}

document.addEventListener('DOMContentLoaded', main);