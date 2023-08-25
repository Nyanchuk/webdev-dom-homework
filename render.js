import { listElement } from './dom.js';
import { like, quote } from './events.js';
import { buttonElement, nameInputElement, comInputElement } from './dom.js';
import { postAPI } from './api.js';

const render = (coments) => {
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
    like(coments);
    quote(coments);
  };

export { render };

const initClickHandler = () => {
    buttonElement.addEventListener('click', () => {
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
  
  export { initClickHandler };


































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