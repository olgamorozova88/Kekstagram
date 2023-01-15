const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const isEscKeyPressed = (evt) => {
  return evt.key === Keys.ECS || evt.key === Keys.ESCAPE
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

export { isEscKeyPressed, shuffle, debounce };
