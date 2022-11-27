import { isEscKeyPressed } from './util.js';
const body = document.querySelector('body');
const successNotificationTemplate = document.querySelector('#success').content.querySelector('.success');
const errorNotificationTemplate = document.querySelector('#error').content.querySelector('.error');
let notification = '';

const onEscPressClose = () => {
  if (isEscKeyPressed) {
    removeNotification();
  }
}

const onDocumentClickClose = (evt) => {
  if (evt.target === notification) {
    removeNotification();
  }
}

const clearBodyListeners = () => {
  document.removeEventListener('click', onDocumentClickClose);
  document.removeEventListener('keydown', onEscPressClose);
}

const removeNotification = () =>{
  body.removeChild(notification);
  clearBodyListeners();
}

const serverError = () => {
  const errorMessageContainer = document.createElement('div');
  errorMessageContainer.style.justifyContent = 'center';
  errorMessageContainer.style.alignItems = 'center';
  errorMessageContainer.style.display = 'flex';
  errorMessageContainer.style.width = '100%';
  errorMessageContainer.style.height = '100vh';
  errorMessageContainer.style.position = 'absolute';
  errorMessageContainer.style.inset = 0;
  errorMessageContainer.style.backgroundColor = 'rgba(0,0,0, 0.8)';
  errorMessageContainer.style.zIndex = 100;
  const errorMessageContent = document.createElement('p');
  errorMessageContent.style.width = '600px';
  errorMessageContent.style.height ='150px';
  errorMessageContent.style.display = 'flex';
  errorMessageContent.style.justifyContent = 'center';
  errorMessageContent.style.alignItems = 'center';
  errorMessageContent.style.textAlign = 'center';
  errorMessageContent.style.backgroundColor = '#232321';
  errorMessageContent.style.boxShadow = '0 0 50px 5px #ffe753';
  errorMessageContent.textContent = 'Не удалось загрузить изображения с сервера. Повторите попытку позже';
  errorMessageContent.style.color = '#ffe753';
  errorMessageContent.style.fontFamily = 'Open Sans, Arial, sans-serif';
  errorMessageContent.style.fontSize = '25px';
  errorMessageContent.style.fontWeight = 700;
  errorMessageContent.style.lineHeight = '1.5';
  errorMessageContainer.appendChild(errorMessageContent)
  setTimeout(() => {
    body.appendChild(errorMessageContainer);
  }, 1000);
  setTimeout(() => {
    body.removeChild(errorMessageContainer);
  }, 5000);
}

const onSuccess = () => {
  notification = successNotificationTemplate.cloneNode(true);
  const closeSuccsessNotificationBtn = notification.querySelector('.success__button');
  closeSuccsessNotificationBtn.addEventListener('click', removeNotification)
  body.appendChild(notification);
  document.addEventListener('click', onDocumentClickClose);
  document.addEventListener('keydown', onEscPressClose);
}

const onError = () => {
  notification = errorNotificationTemplate.cloneNode(true);
  const closeErrorNotificationBtn = notification.querySelector('.error__button');
  closeErrorNotificationBtn.addEventListener('click', removeNotification);
  body.appendChild(notification);
  document.addEventListener('click', onDocumentClickClose);
  document.addEventListener('keydown', onEscPressClose);
}

export { serverError, onSuccess, onError }
