import { setDefaultEffect, onEffectToggle } from'./add-effect.js';

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const imageUploadField = document.querySelector('#upload-file');
const imagePreview = document.querySelector('.img-upload__overlay');
const hashtagInput = imagePreview.querySelector('.text__hashtags');
const imagePreviewClose = imagePreview.querySelector('.img-upload__cancel');
const imageUploaded = imagePreview.querySelector('.img-upload__preview > img');
const scaleInput = imagePreview.querySelector('.scale__control--value');
const scaleUp = imagePreview.querySelector('.scale__control--bigger');
const scaleDown = imagePreview.querySelector('.scale__control--smaller');


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

const onImagePreviewCloseButtonClick = () => {
  imagePreview.classList.add('hidden');
  imageUploadField.value = '';
  imagePreviewClose.removeEventListener('click', onImagePreviewCloseButtonClick);
  scaleUp.removeEventListener('click', onScaleUpButtonClick);
  scaleDown.removeEventListener('click', onScaleDownButtonClick);
  document.removeEventListener('keydown', onEscKeyPress);
};

const onEscKeyPress = (evt) => {
  if ((evt.key === Keys.ECS && document.activeElement !== hashtagInput)  || (evt.key === Keys.ESCAPE && document.activeElement !== hashtagInput)) {
    imagePreview.classList.add('hidden');
    imageUploadField.value = '';
    imagePreviewClose.removeEventListener('click', onImagePreviewCloseButtonClick);
    scaleUp.removeEventListener('click', onScaleUpButtonClick);
    scaleDown.removeEventListener('click', onScaleDownButtonClick);
    document.removeEventListener('keydown', onEscKeyPress);
  }
};

const onImageUpload = () => {
  imagePreview.classList.remove('hidden');
  imagePreviewClose.addEventListener('click', onImagePreviewCloseButtonClick);
  document.addEventListener('keydown', onEscKeyPress);
  scaleInput.value = SCALE.MAX + '%';
  scaleUp.addEventListener('click', onScaleUpButtonClick);
  scaleDown.addEventListener('click', onScaleDownButtonClick);
  setDefaultEffect();
  onEffectToggle();
};

imageUploadField.addEventListener('change', onImageUpload);







