const pageBody = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');

bigPicture.querySelector('.comments-loader').classList.add('hidden');
bigPicture.querySelector('.social__comment-count').classList.add('hidden');

const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = (comment) => {
  const similarComment = commentTemplate.cloneNode(true);
  similarComment.querySelector('.social__picture').src = comment.avatar;
  similarComment.querySelector('.social__picture').alt = comment.name;
  similarComment.querySelector('.social__text').textContent = comment.message;
  return similarComment;
}

const renderComments = (comments) => {
  const commentsFragment = document.createDocumentFragment();
  comments.forEach(comment => {
    commentsFragment.appendChild(createComment(comment))
  });
  commentsList.appendChild(commentsFragment);
}

const onBigPictureCloseClick = () => {
  pageBody.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onEscKeyPress);
  commentsList.innerHTML = '';
}

const onEscKeyPress = (evt) => {
  if (evt.code === 'Escape') {
    pageBody.classList.remove('modal-open');
    bigPicture.classList.add('hidden');
    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    commentsList.innerHTML = '';
  }
}

const showBigPicture = (picture) => {
  pageBody.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  commentsList.innerHTML = '';
  renderComments(picture.comments);
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', onEscKeyPress);
  bigPicture.classList.remove('hidden');
}

export { showBigPicture };
