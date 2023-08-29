import { render } from './render.js';

const todosURL = 'https://wedev-api.sky.pro/api/v2/:julya-nyanchuk/comments';

//СБРОС ТОКЕНА
export const resetToken = () => {
  token = null;
};
//НОВЫЙ ТОКЕН
export let token ;
export const setToken = (newToken) => {
  token = newToken;
}
//НОВОЕ ИМЯ
export let name ;
export const setName = (newName) => {
  name = newName;
}


export const getAPI = () => {
    return fetch(todosURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        const coments = responseData.comments;
        render(coments);
      });
};
 
export const postAPI = (nameInputElement, comInputElement) => {
  fetch(todosURL, {
    method: "POST",
    body: JSON.stringify({
      text: comInputElement.value,
      name: nameInputElement.value,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      // console.log(response);
      if (response.status === 201) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          if (response.status === 400) {
            throw new Error("BadRequest: " + errorData.message);
          } else if (response.status === 500) {
            throw new Error("ServerUnavailable: Непредвиденная ошибка сервера");
          } else if (response.status === 401) {
            throw new Error("Нет авторизации!");
          } else {
            throw new Error("ServerError: Сервер упал");
          }
        });
      }
    })
    .then((data) => {
      console.log(data);
      getAPI();
    })
    .catch((error) => {
      // buttonElement.disabled = false;
      // buttonElement.textContent = "Написать";
      
      const errorMessage = error.message;

      if (errorMessage.startsWith("BadRequest:")) {
          alert('Некорректные данные. Пожалуйста, заполните все поля и проверьте правильность введенной информации.');
      } else if (errorMessage.startsWith("ServerUnavailable:")) {
          alert('Сервер временно не работает. Попробуйте позднее.');
      } else if (errorMessage.startsWith("ServerError:") || errorMessage.startsWith("Error:")) {
          alert('Кажется что-то пошло не так. Попробуйте позже.');
      } else {
          alert('Неизвестная ошибка. Попробуйте еще раз.');
      }
      console.warn(error);
    });
};

let coments = [];


// TOKEN
export function loginUser({ login, password }) {
  return fetch('https://wedev-api.sky.pro/api/user/login', {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль")
    }
    return response.json()
  });
}

export function registerUser({ name, login, password }) {
  return fetch('https://wedev-api.sky.pro/api/user', {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует")
    }
    return response.json()
  });
}




























// export const login = (nameInputElement, comInputElement) => {
//   fetch(userURL, {
//     method: "POST",
//     body: JSON.stringify({
//       text: comInputElement.value,
//       name: nameInputElement.value,
//     }),
//   })
//     .then((response) => {
//       console.log(response);
//       if (response.status === 201) {
//         return response.json();
//       } else {
//         return response.json().then((errorData) => {
//           if (response.status === 400) {
//             throw new Error("BadRequest: " + errorData.message);
//           } else if (response.status === 500) {
//             throw new Error("ServerUnavailable: Непредвиденная ошибка сервера");
//           } else {
//             throw new Error("ServerError: Сервер упал");
//           }
//         });
//       }
//     })
//     .then((data) => {
//       console.log(data);
//       getAPI();
//     })
//     .catch((error) => {
//       buttonElement.disabled = false;
//       buttonElement.textContent = "Написать";
      
//       const errorMessage = error.message;

//       if (errorMessage.startsWith("BadRequest:")) {
//           alert('Некорректные данные. Пожалуйста, заполните все поля и проверьте правильность введенной информации.');
//       } else if (errorMessage.startsWith("ServerUnavailable:")) {
//           alert('Сервер временно не работает. Попробуйте позднее.');
//       } else if (errorMessage.startsWith("ServerError:") || errorMessage.startsWith("Error:")) {
//           alert('Кажется что-то пошло не так. Попробуйте позже.');
//       } else {
//           alert('Неизвестная ошибка. Попробуйте еще раз.');
//       }
//       console.warn(error);
//     });
// };




























// import { buttonElement, nameInputElement, comInputElement, loadingElement } from './dom.js';
// import { render } from './render.js';

// export const getAPI = () => {
//     fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
//       method: "GET",
//     })
//       .then((response) => response.json())
//       .then((responseData) => {
//         console.log(responseData);
//         coments = responseData.comments;
//         buttonElement.disabled = false;
//         buttonElement.textContent = "Написать";
//         loadingElement.remove();
//         render(coments);
//       });
//   };
  
// export const postAPI = (nameInputElement, comInputElement) => {
//     fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
//       method: "POST",
//       body: JSON.stringify({
//         text: comInputElement.value,
//         name: nameInputElement.value,
//       }),
//     })
//       .then((response) => {
//         console.log(response);
//         if (response.status === 201) {
//           return response.json();
//         } else {
//           return response.json().then((errorData) => {
//             if (response.status === 400) {
//               throw new Error("BadRequest: " + errorData.message);
//             } else if (response.status === 500) {
//               throw new Error("ServerUnavailable: Непредвиденная ошибка сервера");
//             } else {
//               throw new Error("ServerError: Сервер упал");
//             }
//           });
//         }
//       })
//       .then((data) => {
//         console.log(data);
//         getAPI();
//       })
//       .catch((error) => {
//         buttonElement.disabled = false;
//         buttonElement.textContent = "Написать";
        
//         const errorMessage = error.message;

//         if (errorMessage.startsWith("BadRequest:")) {
//             alert('Некорректные данные. Пожалуйста, заполните все поля и проверьте правильность введенной информации.');
//         } else if (errorMessage.startsWith("ServerUnavailable:")) {
//             alert('Сервер временно не работает. Попробуйте позднее.');
//         } else if (errorMessage.startsWith("ServerError:") || errorMessage.startsWith("Error:")) {
//             alert('Кажется что-то пошло не так. Попробуйте позже.');
//         } else {
//             alert('Неизвестная ошибка. Попробуйте еще раз.');
//         }
//         console.warn(error);
//       });
//   };
  
// let coments = [];

