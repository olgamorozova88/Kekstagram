import { isEscKeyPressed } from './util.js';

const pageBody = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
const commentsList = bigPhoto.querySelector('.social__comments');
const commentsShown = bigPhoto.querySelector('.social__comment-count');
const commentsTotalCount = bigPhoto.querySelector('.comments-count');
const showMoreCommentsBtn = bigPhoto.querySelector('.comments-loader')
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(comment => {
    const similarComment = commentTemplate.cloneNode(true);
    similarComment.querySelector('.social__picture').src = comment.avatar;
    similarComment.querySelector('.social__picture').alt = comment.name;
    similarComment.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(similarComment);
  });
  commentsList.appendChild(commentsFragment);
  commentsTotalCount.textContent = comments.length;
  if (comments.length <= 5) {
    commentsShown.classList.add('hidden');
    showMoreCommentsBtn.classList.add('hidden');
    commentsTotalCount.textContent = 125;
  }
}

const onBigPhotoCloseClick = () => {
  pageBody.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  bigPhotoClose.removeEventListener('click', onBigPhotoCloseClick);
  document.removeEventListener('keydown', onEscKeyPress);
  commentsList.innerHTML = '';
  if (commentsShown.classList.contains('hidden') && showMoreCommentsBtn.classList.contains('hidden')) {
    commentsShown.classList.remove('hidden');
    showMoreCommentsBtn.classList.remove('hidden');
  }
  commentsTotalCount.textContent = 125;
}

const onEscKeyPress = () => {
  if (isEscKeyPressed) {
    pageBody.classList.remove('modal-open');
    bigPhoto.classList.add('hidden');
    bigPhotoClose.removeEventListener('click', onBigPhotoCloseClick);
    commentsList.innerHTML = '';
  }
}

const showBigPicture = (photo) => {
  pageBody.classList.add('modal-open');
  bigPhoto.querySelector('.big-picture__img > img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.social__caption').textContent = photo.description;
  renderComments(photo.comments);
  bigPhotoClose.addEventListener('click', onBigPhotoCloseClick);
  document.addEventListener('keydown', onEscKeyPress);
  bigPhoto.classList.remove('hidden');
}

export { showBigPicture };
