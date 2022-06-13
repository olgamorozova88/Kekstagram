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

export {getRandomInt, getMessageLength, getRandomArrayElement};
