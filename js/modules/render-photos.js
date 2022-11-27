import { showBigPicture } from './big-picture-show.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const renderPhotos = (photos) => {
  const photoPreviews = document.createDocumentFragment();
  photos.forEach((photo) => {
    const photoPreview = pictureTemplate.cloneNode(true);
    photoPreview.querySelector('.picture__img').src = photo.url;
    photoPreview.querySelector('.picture__comments').textContent = photo.comments.length;
    photoPreview.querySelector('.picture__likes').textContent = photo.likes;
    photoPreview.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(photo);
    })
    photoPreviews.appendChild(photoPreview);
  })
  pictures.appendChild(photoPreviews);
}

export {renderPhotos}
