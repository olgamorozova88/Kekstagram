'use strict';
// Функция, возвращающая случайное целое число из переданного диапазона включительно. Только положительные числа.

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
};

// Функция для проверки максимальной длины строки.

const getMessageLength = (message, maxLength) => {
  return message.length <= maxLength;
}; 