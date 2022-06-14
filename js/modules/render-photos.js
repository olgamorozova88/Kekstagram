import { photos } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures')

const createPicture = ({url, comments, likes}) => {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__comments').textContent = comments.length;
  picture.querySelector('.picture__likes').textContent = likes;
  return picture;
}

const renderPictures = () => {
  const pictureFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    pictureFragment.appendChild(createPicture(photo))
  });

  pictures.appendChild(pictureFragment);
}

export {renderPictures};
