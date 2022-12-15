const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const isEscKeyPressed = (evt) => {
  return evt.key === Keys.ECS || evt.key === Keys.ESCAPE
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0) {
    throw Error('Числа должны быть положительными');
  }
  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getMessageLength = (message, maxLength) => {
  return message.length <= maxLength;
}

const getRandomArrayElement = (array) => {
  let i = getRandomInt(0, array.length - 1);
  return array[i];
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const debounce = (fn, ms) => {
  let timeout;
  return function () {
    const fnCall = () => {
      fn.apply(this, arguments)
    }
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, ms)
  };
}

export { getRandomInt, getMessageLength, getRandomArrayElement, isEscKeyPressed, shuffle, debounce };
