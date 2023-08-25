import { buttonElement, nameInputElement, comInputElement, loadingElement } from './dom.js';
import { render } from './render.js';

export const getAPI = () => {
    fetch("https://wedev-api.sky.pro/api/v2/:julya-nyanchuk/comments", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        coments = responseData.comments;
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        loadingElement.remove();
        render(coments);
      });
  };
  
export const postAPI = (nameInputElement, comInputElement) => {
    fetch("https://wedev-api.sky.pro/api/v2/:julya-nyanchuk/comments", {
      method: "POST",
      body: JSON.stringify({
        text: comInputElement.value,
        name: nameInputElement.value,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            if (response.status === 400) {
              throw new Error("BadRequest: " + errorData.message);
            } else if (response.status === 500) {
              throw new Error("ServerUnavailable: Непредвиденная ошибка сервера");
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
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
        
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

