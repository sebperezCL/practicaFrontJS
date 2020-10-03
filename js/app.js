import { templateLanding } from '../templates/landing.js';
import { templateRegister } from '../templates/register.js';

function main () {
  const mainSection = document.querySelector('#main-landing');
  mainSection.innerHTML = templateLanding.render();

  const btn_register = document.querySelector('#btn_register');

  if (btn_register) {
    btn_register.addEventListener('click', onRenderRegistro);
  }

  function onRenderRegistro () {
    mainSection.innerHTML = templateRegister.render();
    const btn_register = document.querySelector('#btn_submit_register');
    btn_register.addEventListener('click', onRegistrar);
  }

  function onRegistrar(ev) {
    ev.preventDefault();
    const form = document.querySelector('form');
    if (!form.checkValidity()) {
      const inputs = [...form.querySelectorAll('.tocheck')];
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
      //console.dir(inputs);
      return;
    }
    console.log('Registrado');
  }
}

document.addEventListener('DOMContentLoaded', main);