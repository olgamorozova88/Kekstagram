import { hashtagInput, commentInput } from './editor.js';

const COMMENT_MAX_LENGHT = 140;

const HashtagSettings = {
  COUNT: 5,
  MAXLENGTH: 20,
  PATTERN: /#[a-zA-Zа-яА-Я0-9]+$/,
  PATTERN_NO_SPACE: /[a-zA-Zа-яА-Я0-9]+#[a-zA-Zа-яА-Я0-9]/g,
}

const setRedBorder = (element) => {
  element.style.border = '2px solid red';
  if (document.activeElement === element) {
    element.style.border = '2px solid red';
    element.style.outline = 'none';
  }
}

const removeRedBorder = (element) => {
  element.removeAttribute('style');
  if (document.activeElement === element) {
    element.removeAttribute('style');
  }
}

const checkHashtagValidity = () => {

  const hashtagInputValue = hashtagInput.value.toLowerCase().trim();
  const hashtags = hashtagInputValue.split(' ');

  hashtagInput.setCustomValidity('');
  removeRedBorder(hashtagInput);

  if (!hashtagInputValue) {
    return;
  }

  hashtags.forEach((hashtag, index, arr) => {
    if (hashtag.match(HashtagSettings.PATTERN_NO_SPACE)) {
      hashtagInput.setCustomValidity('Хэштеги должны разделяться пробелами');
      setRedBorder(hashtagInput);
    } else if (!hashtag.startsWith('#', 0)) {
      hashtagInput.setCustomValidity('Хэштег должен начинаться с #');
      setRedBorder(hashtagInput);
    } else if (hashtag.length > HashtagSettings.MAXLENGTH) {
      hashtagInput.setCustomValidity('Длина хэштега не может больше 20 символов, включая решетку');
      setRedBorder(hashtagInput);
    } else if (hashtag.length <= 1 && hashtag.startsWith('#', 0)) {
      hashtagInput.setCustomValidity('Хэштег не может состоять только из #');
      setRedBorder(hashtagInput);
    } else if (!hashtag.match(HashtagSettings.PATTERN)) {
      hashtagInput.setCustomValidity('Хэштег может состоять только из букв и цифр');
      setRedBorder(hashtagInput);
    } else if (arr.includes(hashtag, index + 1)) {
      hashtagInput.setCustomValidity('Хэштеги не могут повторяться');
      setRedBorder(hashtagInput);
    }
  });

  if (hashtags.length > HashtagSettings.COUNT) {
    hashtagInput.setCustomValidity('Количество хэштегов не может быть больше 5');
    setRedBorder(hashtagInput);
  }

  hashtagInput.reportValidity();
}

const checkCommentValidity = () => {
  commentInput.removeAttribute('maxlength');
  const commentLength = commentInput.value.length;
  const extraSymbols = commentLength - COMMENT_MAX_LENGHT;
  if (commentLength > COMMENT_MAX_LENGHT) {
    commentInput.setCustomValidity(`Комментарий не может быть длинее 140 символов. Лишних символов - ${extraSymbols}`);
    setRedBorder(commentInput);
  } else {
    commentInput.setCustomValidity('');
    removeRedBorder(commentInput);
  }
  commentInput.reportValidity();
}

export { checkHashtagValidity, checkCommentValidity }
