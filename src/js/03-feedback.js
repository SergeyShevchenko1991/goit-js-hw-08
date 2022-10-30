import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');

function initValuesFromStore() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (!savedData) return;

  const savedDataParsed = JSON.parse(savedData);
  email.value = savedDataParsed.email || '';
  message.value = savedDataParsed.message || '';
}

function updateStore(key, value) {
  const savedData = localStorage.getItem('feedback-form-state') || '{}';
  const savedDataParsed = JSON.parse(savedData);
  savedDataParsed[key] = value;
  localStorage.setItem('feedback-form-state', JSON.stringify(savedDataParsed));
}

const trottleUpdateStore = throttle(updateStore, 500);

email.addEventListener('input', function (evt) {
  const value = evt.target.value;
  trottleUpdateStore('email', value);
});

message.addEventListener('input', function (evt) {
  const value = evt.target.value;
  trottleUpdateStore('message', value);
});

form.addEventListener('submit', function handleSubmit(evt) {
  evt.preventDefault();
  localStorage.clear();

  console.log({ email: email.value, message: message.value });
  email.value = '';
  message.value = '';
});

initValuesFromStore();
