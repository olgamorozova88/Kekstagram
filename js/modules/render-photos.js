import { photos } from './data.js';
import { showBigPicture } from './big-picture-show.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');

const createPicture = (picture) => {
  const picturePreview = pictureTemplate.cloneNode(true);
  picturePreview.querySelector('.picture__img').src = picture.url;
  picturePreview.querySelector('.picture__comments').textContent = picture.comments.length;
  picturePreview.querySelector('.picture__likes').textContent = picture.likes;
  picturePreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture(picture);
  })
  return picturePreview;
}

const renderPictures = () => {
  const pictureFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    pictureFragment.appendChild(createPicture(photo))
  });

  pictures.appendChild(pictureFragment);
}

export {renderPictures};
