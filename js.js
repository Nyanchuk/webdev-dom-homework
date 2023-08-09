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
        fetch("https://wedev-api.sky.pro/api/v1/:julya-nyanchuk/comments", {
        method: "POST",
        body: JSON.stringify({
            text: comInputElement.value,
            name: nameInputElement.value,
        }),
    })
    .then(() => getAPI())
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