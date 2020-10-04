import { templateIndex } from '../templates/index.js';
import { templateRegister } from '../templates/register.js';
import { templateLogin } from '../templates/login.js';

function main () {
  const mainSection = document.querySelector('#main-landing');
  mainSection.innerHTML = templateIndex.render();

  const btn_register = document.querySelector('#btn_register');
  const btn_login = document.querySelector('#btn_login');

  if (btn_register) {
    btn_register.addEventListener('click', onRenderRegistro);
  }

  if (btn_login) {
    btn_login.addEventListener('click', onRenderLogin);
  }

  function onRenderRegistro () {
    mainSection.innerHTML = templateRegister.render();

    // Selecciono elementos del nuevo formulario
    const btn_register = document.querySelector('#btn_submit_register');
    const select_nac = document.querySelector('#select_nac');

    // Defino los eventos para los elementos
    if (select_nac) { select_nac.addEventListener('change', onSelectNac); }
    if (btn_register) { btn_register.addEventListener('click', onRegistrar); }
  }

  function onRegistrar(ev) {
    ev.preventDefault();
    const form = document.querySelector('form');
    const inputs = [...form.querySelectorAll('.tocheck')];

    if (!validarForm(form, inputs)) {
      return;
    }

    // Revisar si la contraseña se ingresó bien al momento de confirmarla
    const msg_pwd = document.querySelector('#msg_pwd');
    // Selecciono los input password de esta forma ya que la longitud del array puede variar
    // dependiendo si el usuario escogió nacionalidad española o no
    const i_pwd = inputs.find(item => item.id === 'password');
    const i_pwd_confirm = inputs.find(item => item.id === 'password_confirm');
    if (!(i_pwd.value === i_pwd_confirm.value)) {
      i_pwd.classList.add('is-invalid');
      i_pwd_confirm.classList.add('is-invalid');
      msg_pwd.innerHTML = 'Password' + ' - las contraseñas no coinciden';
      msg_pwd.classList.add('text-danger');
      console.dir('error pwd');
      return;
    }
    // Limpio los mensajes
    msg_pwd.innerHTML = 'Password';
    msg_pwd.classList.remove('text-danger');
    i_pwd.classList.remove('is-invalid');
    i_pwd_confirm.classList.remove('is-invalid');

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
    const msg_error = document.querySelector('#msg_fetcherror');
    const spinner = document.querySelector('#spinner');
    msg_error.classList.add('invisible');
    msg_error.innerHTML = '';
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
          msg_error.classList.remove('invisible');
          msg_error.innerHTML = 'Error al recuperar la información de provincias';
        }
        );
    } else {
      const select_prov = document.querySelector('#select_prov');
      select_prov.removeAttribute('required');
      select_prov.setAttribute('disabled', true);
      select_prov.classList.remove('tocheck');
      select_prov.classList.remove('is-invalid');
    }
  }

  // Construimos el select de provincias
  function cargaProvincias (data) {
    const select_prov = document.querySelector('#select_prov');
    select_prov.setAttribute('required', true);
    select_prov.removeAttribute('disabled');
    select_prov.classList.add('tocheck');
    if (select_prov) {
      let html = '<option></option>';
      data.forEach(item => {
        html += `<option value="${item.label}">${item.label}</option>`;
      });
      select_prov.innerHTML = html;
    }
  }

  function onRenderLogin () {
    mainSection.innerHTML = templateLogin.render();
    const btn_login = document.querySelector('#btn_login');

    if (btn_login) {
      btn_login.addEventListener('click', onLogin);
    }
  }

  function onLogin (ev) {
    ev.preventDefault();

    const form = document.querySelector('form');
    const inputs = [...form.querySelectorAll('.tocheck')];
    const msg_warning = document.querySelector('#msg_warning');
    msg_warning.classList.add('d-none');

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
        msg_warning.classList.remove('d-none');
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