import { isEscKeyPressed } from './util.js';

const COMMENTS_COUNT_STEP = 5;

let commentsCount = COMMENTS_COUNT_STEP;

const pageBody = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const bigPhotoClose = bigPhoto.querySelector('.big-picture__cancel');
const commentsList = bigPhoto.querySelector('.social__comments');
const commentsShownCount = bigPhoto.querySelector('.social__comment-count');
const showMoreCommentsBtn = bigPhoto.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const commentsCountReset = () => {
  commentsCount = COMMENTS_COUNT_STEP;
}
const createComment = (comment) => {
  const similarComment = commentTemplate.cloneNode(true);
  similarComment.querySelector('.social__picture').src = comment.avatar;
  similarComment.querySelector('.social__picture').alt = comment.name;
  similarComment.querySelector('.social__text').textContent = comment.message;
  return similarComment;
}

const onShowMoreCommentsBtnClick = (comments) => {
  return () => renderComments(comments);
}

const renderComments = (comments) => {
  commentsCount = (comments.length > commentsCount) ? commentsCount : comments.length;
  const commentsToShow = comments.slice(0, commentsCount);
  commentsShownCount.textContent = `${commentsCount} из ${comments.length} комментариев`;
  const commentsFragment = document.createDocumentFragment();
  commentsToShow.forEach(comment => {
    commentsFragment.append(createComment(comment));
  });
  commentsList.innerHTML ='';
  commentsList.append(commentsFragment);
  if (commentsCount === comments.length) {
    showMoreCommentsBtn.classList.add('hidden');
  } else {
    showMoreCommentsBtn.classList.remove('hidden');
    showMoreCommentsBtn.addEventListener('click', onShowMoreCommentsBtnClick(comments), {once: true});
  }
  commentsCount += COMMENTS_COUNT_STEP;
}

const showComments = (comments) => {
  const commentsLoaded = comments.slice();
  renderComments(commentsLoaded);
}

const onBigPhotoCloseClick = () => {
  pageBody.classList.remove('modal-open');
  bigPhoto.classList.add('hidden');
  bigPhotoClose.removeEventListener('click', onBigPhotoCloseClick);
  document.removeEventListener('keydown', onEscKeyPress);
  commentsList.innerHTML = '';
  commentsCountReset();
}

const onEscKeyPress = () => {
  if (isEscKeyPressed) {
    onBigPhotoCloseClick();
  }
}

const showBigPicture = (photo) => {
  pageBody.classList.add('modal-open');
  bigPhoto.querySelector('.big-picture__img > img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.social__caption').textContent = photo.description;
  showComments(photo.comments);
  bigPhotoClose.addEventListener('click', onBigPhotoCloseClick);
  document.addEventListener('keydown', onEscKeyPress);
  bigPhoto.classList.remove('hidden');
}

export { showBigPicture };
