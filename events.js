export const like = (coments) => {
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

export  const quote = (coments) => {
    const coment = document.querySelectorAll('.comment');
    coment.forEach((coment, index) => {
      coment.addEventListener('click', () => {
        comInputElement.value = '>'+ ' ' + coments[index].text + ' (' + coments[index].author.name + ')';
        render();
      })
    })
  }