import { listElement } from './dom-elements.js';

export const like = () => {
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

export const quote = () => {
    const coment = document.querySelectorAll('.comment');
    coment.forEach((coment, index) => {
      coment.addEventListener('click', () => {
        comInputElement.value = '>'+ ' ' + coments[index].text + ' (' + coments[index].author.name + ')';
        render();
      })
    })
  }

export const render = () => {
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
  
