export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
        method: "GET",
    })
    .then((response) => response.json())
}

export function postTodos({ text }, { name }) {
    return fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
        method: "POST",
        body: JSON.stringify({
            text,
            name,
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
}