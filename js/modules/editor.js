import { setDefaultEffect, onEffectToggle } from'./add-effect.js';
import { checkHashtagValidity, checkCommentValidity } from './validation.js';
import { isEscKeyPressed } from './util.js';
import { sendData } from './api.js';
import { onSuccess, onError } from './alerts.js'

const SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const imageUploadField = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__overlay');
const hashtagInput = imagePreview.querySelector('.text__hashtags');
const commentInput = imagePreview.querySelector('.text__description');
const imagePreviewClose = imagePreview.querySelector('.img-upload__cancel');
const imageUploaded = imagePreview.querySelector('.img-upload__preview > img');
const scaleInput = imagePreview.querySelector('.scale__control--value');
const scaleUp = imagePreview.querySelector('.scale__control--bigger');
const scaleDown = imagePreview.querySelector('.scale__control--smaller');
const form = document.querySelector('#upload-select-image');

const setUploadedFilePreview = () => {
  const fileReader = new FileReader();
  const file = imageUploadField.files[0];
  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    imageUploaded.src = fileReader.result;
  }
}

const onScaleUpButtonClick = () => {
  let scaleValue = parseInt(scaleInput.value) + SCALE.STEP;
  if (scaleValue >= 100) {
    scaleValue = SCALE.MAX;
  }
  scaleInput.value = `${scaleValue}%`;
  imageUploaded.style.transform = `scale(${scaleValue / 100})`;
};

const onScaleDownButtonClick = () => {
  let scaleValue = parseInt(scaleInput.value) - SCALE.STEP;
  if (scaleValue <= 25) {
    scaleValue = SCALE.MIN;
  }
  scaleInput.value = `${scaleValue}%`;
  imageUploaded.style.transform = `scale(${scaleValue / 100})`;
};

const closeEditor = () => {
  imageUploaded.removeAttribute('class');
  imageUploaded.removeAttribute('style');
  imagePreview.classList.add('hidden');
}

const resetForm = () => {
  imageUploadField.value = '';
  scaleInput.value = `${SCALE.MAX}%`;
  hashtagInput.value = '';
  commentInput.value = '';
  setDefaultEffect();
}

const clearFormEventListeners = () => {
  imagePreviewClose.removeEventListener('click', onImagePreviewCloseButtonClick);
  scaleUp.removeEventListener('click', onScaleUpButtonClick);
  scaleDown.removeEventListener('click', onScaleDownButtonClick);
  document.removeEventListener('keydown', onEscKeyPress);
  hashtagInput.removeEventListener('input', checkHashtagValidity);
  commentInput.removeEventListener('input', checkCommentValidity);
}

const onImagePreviewCloseButtonClick = () => {
  closeEditor();
  resetForm();
  clearFormEventListeners()
};

const onEscKeyPress = () => {
  if (isEscKeyPressed && document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    closeEditor();
    resetForm();
    clearFormEventListeners()
  }
};

const onImageUpload = () => {
  setUploadedFilePreview();
  imagePreview.classList.remove('hidden');
  imagePreviewClose.addEventListener('click', onImagePreviewCloseButtonClick);
  document.addEventListener('keydown', onEscKeyPress);
  scaleInput.value = SCALE.MAX + '%';
  scaleUp.addEventListener('click', onScaleUpButtonClick);
  scaleDown.addEventListener('click', onScaleDownButtonClick);
  setDefaultEffect();
  onEffectToggle();
  hashtagInput.addEventListener('input', checkHashtagValidity);
  commentInput.addEventListener('input', checkCommentValidity);
};

imageUploadField.addEventListener('change', onImageUpload);

const setFormSubmit = (success, error) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(evt.target, success, error);
    closeEditor();
    resetForm();
    clearFormEventListeners();
  })
}

setFormSubmit(onSuccess, onError);

export { imagePreview, imageUploaded, hashtagInput, commentInput };







