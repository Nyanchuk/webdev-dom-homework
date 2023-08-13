

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const comInputElement = document.getElementById("com-input");
const comentElement = document.querySelectorAll('.comment');
const loadingElement = document.querySelector('.loader');

const getAPI = () => {
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
            render();
          });
      };
      getAPI();

    const postAPI = (nameInputElement, comInputElement) => {
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

    let coments = [];

    const like = () => {
      const likeButtons = document.querySelectorAll('.like-button');
        for(const like of likeButtons){
          like.addEventListener('click', (event) => {
            event.stopPropagation();
            const com = coments[like.dataset.index];
            let a = com.likes;
            if (com.isLiked === false) {
                com.isLiked = true;
                like.classList.add('-active-like');
                com.likes++;
              } else if (com.isLiked === true) {
                com.isLiked = false
                com.likes--;
            }
            render(); 
            });
          }
        };

    const quote = () => {
      const coment = document.querySelectorAll('.comment');
      coment.forEach((coment, index) => {
        coment.addEventListener('click', () => {
          comInputElement.value = '>'+ ' ' + coments[index].text + ' (' + coments[index].author.name + ')';
          render();
        })
      })
    }

    const render = () => {
      const comHtml = coments.map((coment, index) => {
        const commentDate = new Date(coment.date);
        const timeDate = commentDate.toLocaleDateString() + ' ' +commentDate.getHours() + ':' + commentDate.getMinutes();
        return `<li class="comment" >
          <div class="comment-header">
            <div>${coment.author.name}</div>
            <div>${timeDate}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${coment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${coment.likes}</span>
              <button class="like-button ${coment.isLiked ? '-active-like' : ''}" data-index = ${index}></button>
            </div>
          </div>
        </li>`
      }).join('');
      listElement.innerHTML = comHtml;
      like();
      quote()
    };
    render()

    buttonElement.addEventListener('click' , () => {
        nameInputElement.classList.remove('error');
        if(nameInputElement.value === "" || comInputElement.value === "") {
            comInputElement.classList.add('error');
            nameInputElement.classList.add('error');
            return;
        } 
        comInputElement.classList.remove('error');
        //Открытие события при отправке комментария
        buttonElement.disabled = true;
        buttonElement.textContent = "Ваш комментарий добавлятся...";

        function date(newDate) {
            let fullHour = newDate.toLocaleDateString() + " " + newDate.getHours() + ":"+ newDate.getMinutes();
            return fullHour;
            }
        date(new Date())
        postAPI(nameInputElement, comInputElement);
    });





//Код для пост-апи
 // const postAPI = (nameInputElement, comInputElement) => {
    //     fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         text: comInputElement.value,
    //         name: nameInputElement.value,
    //     }),
    // })
    // .then(() => getAPI())
    // .catch((error) => console.error(error));
    // };













// НИЖЕ ОБЫЧНЫЙ КОД БЕЗ API (DOM1 DOM2 DOM3)


    // const buttonElement = document.getElementById("add-button");
    // const listElement = document.getElementById("list");
    // const nameInputElement = document.getElementById("name-input");
    // const comInputElement = document.getElementById("com-input");
    // const comentElement = document.querySelectorAll('.comment');

   
    // const coments = [
    //   {
    //     name:"Глеб Фокин",
    //     data:"12.02.22 12:18",
    //     com:"Это будет первый комментарий на этой странице",
    //     likes:"3",
    //     liked: false,
    //   },
    //   {
    //     name:"Варвара Н.",
    //     data:"13.02.22 19:22",
    //     com:"Мне нравится как оформлена эта страница! ❤",
    //     likes:"74",
    //     liked: false,
    //   }
    // ];
    
    // const like = () => {
    //   const likeButtons = document.querySelectorAll('.like-button');
    //     for(const like of likeButtons){
    //       like.addEventListener('click', (event) => {
    //         event.stopPropagation();
    //         const com = coments[like.dataset.index];
    //         let a = like.likes;
    //         if (com.liked === false) {
    //             com.liked = true;
    //             like.classList.add("-active-like")
    //             com.likes++;
    //           } else if (com.liked === true) {
    //             com.liked = false
    //             com.likes--;
    //           }
    //           render(); 
    //         });
    //       }
    //     };

    // const quote = () => {
    //   const coment = document.querySelectorAll('.comment');
    //   coment.forEach((coment, index) => {
    //     coment.addEventListener('click', () => {
    //       comInputElement.value = '>'+ ' ' + coments[index].com + ' (' + coments[index].name+ ')';
    //       render();
    //     })
    //   })
    // }

    // const render = () => {
    //   const comHtml = coments.map((coment, index) =>{
    //     return `<li class="comment" >
    //       <div class="comment-header">
    //         <div>${coment.name}</div>
    //         <div>${coment.data}</div>
    //       </div>
    //       <div class="comment-body">
    //         <div class="comment-text">
    //           ${coment.com}
    //         </div>
    //       </div>
    //       <div class="comment-footer">
    //         <div class="likes">
    //           <span class="likes-counter">${coment.likes}</span>
    //           <button class="like-button ${coment.liked ? '-active-like' : ''}" data-index = ${index}></button>
    //         </div>
    //       </div>
    //     </li>`
    //   }).join('');
    //   listElement.innerHTML = comHtml;
    //   like();
    //   quote()
    // };
    // render()

    // Добавляем в хранилище данных новый комментарий

    // buttonElement.addEventListener('click' , () => {
    // nameInputElement.classList.remove('error');
      
    //   if(nameInputElement.value === "" || comInputElement.value === "") {
    //     comInputElement.classList.add('error');
    //     nameInputElement.classList.add('error');
    //     return;
    //   } 
    //   comInputElement.classList.remove('error');
    //   //Функция определения текущей даты:
    //   function date(newDate) {
    //       let fullHour = newDate.toLocaleDateString() + " " + newDate.getHours() + ":"+ newDate.getMinutes();
    //       return fullHour;
    //     }
    //     date(new Date())
    //   //Добавляем массив с коментариями
    //   coments.push({
    //     name: nameInputElement.value,
    //     data: date(new Date()),
    //     com: comInputElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),
    //     likes:"0",
    //     liked: false,
    //   })
    //     render();
        
    // });