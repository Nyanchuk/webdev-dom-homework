import { buttonElement, loadingElement } from './dom-elements.js';

export const getAPI = () => {
    fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
        method: "GET",
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData);
            coments = responseData.comments;
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            loadingElement.remove();
            
          });
      };

export const postAPI = (nameInputElement, comInputElement) => {
        if(comInputElement.value.length < 3 || nameInputElement.value.length < 3) {
            alert('Имя и комментарий должны быть не короче 3 символов');
        }
        fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
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
            return response.json().then((errorData) => { //Если статус ответа не равен 201, то возвращаем end обрабатываем данные ошибки
                // Дальше мы обрабатываем разные статусы ошибок (400, 500 и другие) и выбрасываем соответствующие исключения с сообщениями об ошибках

                if (response.status === 400) { //Если статус ответа равен 400 (ошибка «Bad Request»), то мы обрабатываем эту ошибку
                    throw new Error("BadRequest: " + errorData.message); //errorData.message. errorData - это объект JSON, который приходит от сервера и содержит информацию об ошибке
                } else if (response.status === 500) { //Если статус ответа равен 500 (ошибка «Internal Server Error»), то мы обрабатываем эту ошибку
                    throw new Error("ServerUnavailable: Непредвиденная ошибка сервера"); //Мы предполагаем, что произошла внутренняя ошибка сервера и информируем об этом пользователя
                } else { //Во всех остальных случаях, когда статус ответа не равен 400 или 500, но все же является ошибкой
                    throw new Error("ServerError: Сервер упал"); // Мы не можем уточнить причину ошибки и делаем общее предположение о том, что сервер "упал"
                }
            });
        }
    })
    .then((data) => {
        console.log(data);
        getAPI();
    })
// Обработка возможных ошибок или исключений:
    .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Написать";
// Обработка разных типов ошибок и отображение соответствующих сообщений для пользователя через alert():
        if (error.message.startsWith("BadRequest:")) { // "BadRequest:", то это значит, что запрос был сформирован с некорректными данными
            alert('Некорректные данные. Пожалуйста, заполните все поля и проверьте правильность введенной информации.');
        } else if (error.message.startsWith("ServerUnavailable:")) {
            alert('Сервер временно не работает. Попробуйте позднее.');
        } else if (error.message.startsWith("ServerError:") || error.message.startsWith("Error:")) {
            alert('Кажется что-то пошло не так. Попробуйте позже.');
        } else {
            alert('Неизвестная ошибка. Попробуйте еще раз.');
        }
// Запись информации об ошибке в консоль с функцией warn():
        console.warn(error);
    })
    };

export let coments = [];