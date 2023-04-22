import { debounce, shuffle } from './util.js';
import { renderPhotos, clearPhotos } from './render-photos.js';

const RANDOM_ELEMENTS_COUNT = 10;
const ACTIVE_CLASS = 'img-filters__button--active';
const DEBOUNCE_DELAY = 500;

const sortButtonsContainer = document.querySelector('.img-filters');
const sortButtons = sortButtonsContainer.querySelectorAll('.img-filters__button');

const showSortButtons = () => {
  sortButtonsContainer.classList.remove('img-filters--inactive');
}

const resetActiveClass = () => {
  sortButtons.forEach(button => button.classList.remove(ACTIVE_CLASS));
}

const sortPhotos = debounce(renderPhotos, DEBOUNCE_DELAY);
const copyPhotos = (photos) => {
  return photos.slice();
}

const onSortButtonClick = (photos) => {
  sortButtonsContainer.addEventListener('click', (evt) => {
    const photosCopy = copyPhotos(photos)
    const target = evt.target;
    clearPhotos();
    resetActiveClass();
    target.classList.add(ACTIVE_CLASS);
    if (target.closest('#filter-default')) {
      sortPhotos(photosCopy);
    } else if (target.closest('#filter-random')) {
      const photosRandom = shuffle(photosCopy).slice(0, RANDOM_ELEMENTS_COUNT);
      sortPhotos(photosRandom);
    } else if (target.closest('#filter-discussed')) {
      const photosDuscussed = photosCopy.sort((a, b) => {
        return b.comments.length - a.comments.length;
      });
      sortPhotos(photosDuscussed);
    }
  })
}

export { showSortButtons, onSortButtonClick };
