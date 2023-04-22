import { getData } from './modules/api.js';
import { serverError } from './modules/alerts.js';
import {renderPhotos} from './modules/render-photos.js'
import './modules/editor.js';
import { showSortButtons, onSortButtonClick } from './modules/sort-photo.js';

getData((photos) => {
  renderPhotos(photos);
  showSortButtons();
  onSortButtonClick(photos);
}, serverError);

