import { getData } from './modules/api.js';
import { serverError } from './modules/alerts.js';
import {renderPhotos} from './modules/render-photos.js'
import './modules/editor.js';
getData(renderPhotos, serverError);

