const DATA_URLS = {
  getData: 'https://23.javascript.pages.academy/kekstagram/data',
  sendData: 'https://23.javascript.pages.academy/kekstagram',
}

const getData = (success, error) => {
  fetch(DATA_URLS.getData)
    .then((response) => {
      if (response.ok) {
        return response
      }
    })
    .then((response) => response.json())
    .then((photos) => success(photos))
    .catch(() => error());
}

const sendData = (data, success, error) => {
  fetch(DATA_URLS.sendData, {
    method: 'POST',
    header: {
      'Content-Type': 'multipart/form-data',
    },
    body: new FormData(data),
  })
    .then((response) => {
      if (response.ok) {
        success()
      } else {
        error()
      }
    })
    .catch(() => error());
}

export { getData, sendData }
