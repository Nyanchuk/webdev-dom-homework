import { like, quote } from './events.js';
import { postAPI } from './api.js';
import { name } from './api.js';
import { renderLogin } from './loginPage.js';
import { getAPI, resetToken } from './api.js';
import { token } from './api.js';

const render = (coments) => {
  const rootElement = document.getElementById('root')
    const comHtml = coments.map((coment, index) => {
      const commentDate = new Date(coment.date);
      const timeDate = commentDate.toLocaleDateString() + ' ' +commentDate.getHours() + ':' + commentDate.getMinutes();
      return `
      <li class="comment" >
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

     const rootHtml = `<div class="container">
     <ul class="comments" id="list">${comHtml}</ul>
     <div class="add-form">
       <input
        value = "${name}"
         id="name-input"
         type="text"
         class="add-form-name"
         placeholder="Введите ваше имя" disabled
       />
       <textarea
         id="com-input"
         value=" "
         type="textarea"
         class="add-form-text"
         placeholder="Введите ваш коментарий"
         rows="4"
       ></textarea>
       <div class="add-form-row">
         <button class="add-form-button" id="add-button">Написать</button>
         
       </div>
     </div>
     <button class="exit-button" id="exit">Выход на страницу авторизации</button>
   </div>`
    rootElement.innerHTML = rootHtml;
    like(coments);
    quote(coments);
    initClickHandler();
    exit({ getAPI });
  };

export { render };

// ВЫХОД НА СТРАНИЦУ АВТОРИЗАЦИИ И СБРОС ТОКЕНА
const exit = ({ getAPI }) => {
  const exitButton = document.getElementById('exit');
  exitButton.addEventListener('click', () => {
    resetToken();
    renderLogin({ getAPI });
  })
}
// ОТПРАВКА НОВОГО КОММЕНТАРИЯ
const initClickHandler = () => {
  const buttonElement = document.getElementById('add-button');
  const nameInputElement = document.getElementById('name-input');
  const comInputElement = document.getElementById('com-input');

    buttonElement.addEventListener('click', () => {
      if (!token) {
        renderLogin({ getAPI });
        return;
      }

      nameInputElement.classList.remove('error');
      if (nameInputElement.value === '' || comInputElement.value === '') {
        comInputElement.classList.add('error');
        nameInputElement.classList.add('error');
        return;
      }
      
      comInputElement.classList.remove('error');
      buttonElement.disabled = true;
      buttonElement.textContent = 'Ваш комментарий добавляется...';

      function date(newDate) {
        let fullHour = newDate.toLocaleDateString() + ' ' + newDate.getHours() + ':' + newDate.getMinutes();
        return fullHour;
      }
      date(new Date());
      postAPI(nameInputElement, comInputElement);
    });
  };




































// import { listElement } from './dom.js';
// import { like, quote } from './events.js';
// import { buttonElement, nameInputElement, comInputElement } from './dom.js';
// import { postAPI } from './api.js';

// const render = (coments) => {
//     const comHtml = coments.map((coment, index) => {
//       const commentDate = new Date(coment.date);
//       const timeDate = commentDate.toLocaleDateString() + ' ' +commentDate.getHours() + ':' + commentDate.getMinutes();
//       return `<li class="comment" >
//         <div class="comment-header">
//           <div>${coment.author.name}</div>
//           <div>${timeDate}</div>
//         </div>
//         <div class="comment-body">
//           <div class="comment-text">
//             ${coment.text}
//           </div>
//         </div>
//         <div class="comment-footer">
//           <div class="likes">
//             <span class="likes-counter">${coment.likes}</span>
//             <button class="like-button ${coment.isLiked ? '-active-like' : ''}" data-index = ${index}></button>
//           </div>
//         </div>
//       </li>`
//      }).join('');
//     listElement.innerHTML = comHtml;
//     like(coments);
//     quote(coments);
//   };

// export { render };

// const initClickHandler = () => {
//     buttonElement.addEventListener('click', () => {
//       nameInputElement.classList.remove('error');
//       if (nameInputElement.value === '' || comInputElement.value === '') {
//         comInputElement.classList.add('error');
//         nameInputElement.classList.add('error');
//         return;
//       }
//       comInputElement.classList.remove('error');
//       buttonElement.disabled = true;
//       buttonElement.textContent = 'Ваш комментарий добавляется...';
  
//       function date(newDate) {
//         let fullHour = newDate.toLocaleDateString() + ' ' + newDate.getHours() + ':' + newDate.getMinutes();
//         return fullHour;
//       }
//       date(new Date());
//       postAPI(nameInputElement, comInputElement);
//     });
//   };
  
//   export { initClickHandler };