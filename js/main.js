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

getRandomInt(1, 10);

// Функция для проверки максимальной длины строки.

const getMessageLength = (message, maxLength) => {
  return message.length <= maxLength;
};

getMessageLength('Это проверочное сообщение', 140);

const PHOTO_COUNT = 25;

const arrayLength = 3;

const LikesRange = {
  MIN: 15,
  MAX: 200,
}

const MessageID = {
  MIN: 1,
  MAX: 999,
};

const Avatar = {
  MIN: 1,
  MAX: 6,
}

const photoDescriptions = [
  'Без фильтров',
  'Из архива',
  'На память',
  'Пусть будет',
  'На новый фотоаппарат',
  'Горизонт не завален',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо.Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const names = [
  'Артём',
  'Ирина',
  'Александр',
  'Валерия',
  'Влад',
  'Юлька',
];

const photos = [];

const getRandomArrayElement = (array) => {
  let i = getRandomInt(0, array.length - 1);
  return array[i];
};

const getComments = () => {
  const array = [];
  while (array.length !== arrayLength) {
    let element = {
      id: getRandomInt(MessageID.MIN, MessageID.MAX),
      avatar: `img/avatr-${getRandomInt(Avatar.MIN, Avatar.MAX)}.svg`,
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names),
    };
    if (array.some((current) => current.id === element.id)) {
      continue;
    }
    array.push(element);
  }
  return array;
};


const getPhotos = () => {
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push({
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayElement(photoDescriptions),
      likes: getRandomInt(LikesRange.MIN, LikesRange.MAX),
      comments: getComments(),
    });
  }
};

getPhotos();
