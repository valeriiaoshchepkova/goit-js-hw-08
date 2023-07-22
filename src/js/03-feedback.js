import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

let formData = {};
const formDataStr = localStorage.getItem(STORAGE_KEY);

if (formDataStr) {
  formData = JSON.parse(formDataStr);
  form.email.value = formData.email;
  form.message.value = formData.message;
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (form.email.value === '' || form.message.value === '') {
    return;
  }

  formData.email = form.email.value;
  formData.message = form.message.value;

  console.log(formData);

  form.reset();
  localStorage.removeItem(STORAGE_KEY);
  formData = {};
}

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);
