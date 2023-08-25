// СТРАНИЦА РЕГИСТРАЦИИ
const buttonEl = document.getElementById('login-button')
const loginEl = document.getElementById('login-input')
const passwordEl = document.getElementById('password-input')
const nameEl = document.getElementById('name-input')

let users = {};

// функция конструктор
function User(loginEl, passwordEl, nameEl) {
    this.login = loginEl;
    this.password = passwordEl;
    this.name = nameEl;
}

// Создаем id для пользователя
function createId(users) {
    // При вызове возращает количество ключей в нашем обьекте
    return Object.keys(users).length;
}

// Создаем нового пользователя
buttonElement.addEventListener('click', () => {
    const loginUser = loginEl.value;
    const passUser = passwordEl.value;
    const nameUser = nameEl.value;
    
    const user = new User(loginUser, passUser, nameUser)

     // Получаем id user
     const userId = 'User' + createId(users);
    //  Добавляем нового пользователя в наш объект
    users[userId] = user;
    console.log(users);
})