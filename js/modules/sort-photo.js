import { debounce, shuffle } from './util.js';
import { renderPhotos, clearPhotos } from './render-photos.js';

const sortButtonsContainer = document.querySelector('.img-filters');
const sortButtons = sortButtonsContainer.querySelectorAll('.img-filters__button');

const showSortButtons = () => {
  sortButtonsContainer.classList.remove('img-filters--inactive');
}

const resetActiveClass = () => {
  sortButtons.forEach(button => button.classList.remove('img-filters__button--active'));
}

const sortPhotos = debounce(renderPhotos, 500);

const onSortButtonClick = (photos) => {
  sortButtonsContainer.addEventListener('click', (evt) => {
    const target = evt.target;
    clearPhotos();
    resetActiveClass();
    target.classList.add('img-filters__button--active');
    if (target.closest('#filter-default')) {
      sortPhotos(photos);
    } else if (target.closest('#filter-random')) {
      const copy = photos.slice();
      const photosRandom = shuffle(copy).slice(0, 10);
      sortPhotos(photosRandom);
    } else if (target.closest('#filter-discussed')) {
      const photosDuscussed = photos.slice().sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
      sortPhotos(photosDuscussed);
    }
  })

}

export { showSortButtons, onSortButtonClick };
