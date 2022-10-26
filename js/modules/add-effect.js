const DEFAULT_EFFECT = 'effect__preview--none';

const EFFECTS = {
  chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: 'grayscale',
    MEASURE: '',
  },

  sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    FILTER: 'sepia',
    MEASURE: '',
  },

  marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    FILTER: 'invert',
    MEASURE: '%',
  },

  phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    FILTER: 'blur',
    MEASURE: 'px',
  },

  heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    FILTER: 'brightness',
    MEASURE: '',
  },
}

const imagePreview = document.querySelector('.img-upload__overlay');
const imageUploaded = imagePreview.querySelector('.img-upload__preview > img');
const effectLevelField = imagePreview.querySelector('.effect-level');
const effectLevelInput = effectLevelField.querySelector('.effect-level__value')
const effectLevelSlider = effectLevelField.querySelector('.effect-level__slider')
const effectToggles = imagePreview.querySelectorAll('.effects__radio');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 0,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setRange = (effect) => {
  if (effect.value === 'none') {
    effectLevelSlider.noUiSlider.destroy();
  } else {
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: EFFECTS[effect.value].MIN,
        max: EFFECTS[effect.value].MAX,
      },
      step: EFFECTS[effect.value].STEP,
      start: EFFECTS[effect.value].MAX,
    });
  }
}

const setDefaultEffect = () => {
  imageUploaded.className = DEFAULT_EFFECT;
  imageUploaded.style.filter = '';
  effectLevelField.classList.add('visually-hidden');
}

const setFilter = (filter, level) => {
  imageUploaded.style.filter = `${EFFECTS[filter].FILTER}(${level}${EFFECTS[filter].MEASURE})`
}

const setEffect = (effect) => {
  return () => {
    if (effect.value === 'none') {
      setDefaultEffect();
    } else {
      imageUploaded.className = `effects__preview--${effect.value}`;
      effectLevelField.classList.remove('visually-hidden');
      setRange(effect);
      effectLevelSlider.noUiSlider.on('update', (values, handle) => {
        effectLevelInput.value = values[handle];
        setFilter(effect.value, effectLevelInput.value);
      });
    }
  }
}

const onEffectToggle = () => {
  for (let toggle of effectToggles) {
    toggle.addEventListener('change', setEffect(toggle));
  }
}
export { setDefaultEffect, onEffectToggle }
