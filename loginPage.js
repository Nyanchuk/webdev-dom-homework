import { loginUser, setToken, token } from './api.js';
import { regLogin } from './regPage.js';
import { setName } from './api.js';

export const renderLogin = ({ getAPI }) => {
    const rootElement = document.getElementById('root')
    const loginHtml = `
    <div class="container">
        <div class="add-form">
        <h3 class="form__title">Войдите, чтобы оставить комментарий</h3>
        <!-- Поля ввода -->
        <div class="form__input">
            <input type="text" id="login" class="input" placeholder="Логин" />
        <input
            type="text"
            id="password"
            class="input"
            placeholder="Пароль"/>
            <button class="login__button" id="button">Войти</button>
            <button class="reg__button" id="button_reg">Регистрация</button>
            </div> 
        </div>
        <button class="chek__button" id="button__not_reg">Продолжить без регистрации</button>
        </div>` 
    rootElement.innerHTML = loginHtml;

const buttonLogin = document.getElementById('button');
const loginElement = document.getElementById('login');
const passwordElement = document.getElementById('password');
const buttonReg = document.getElementById('button_reg');
const buttonNotReg = document.getElementById('button__not_reg');

// КЛИК по кнопке "РЕГИСТРАЦИЯ"
buttonReg.addEventListener('click', () => {
    regLogin({ getAPI })
})
// КЛИК по кнопке "ВОЙТИ"
buttonLogin.addEventListener('click', () => {
    loginUser({
        login: loginElement.value,
        password: passwordElement.value,
    }).then((responseData) => {
        setName(responseData.user.name)
        setToken(responseData.user.token);
        console.log(token);
    }).then(() => {
        getAPI(); 
    })
})

// КЛИК по кнопке "ПРОДОЛЖИТЬ БЕЗ РЕГИСТРАЦИИ"
buttonNotReg.addEventListener('click', () => {
    getAPI();
})
}


































// // СТРАНИЦА РЕГИСТРАЦИИ
// const buttonEl = document.getElementById('login-button')
// const loginEl = document.getElementById('login-input')
// const passwordEl = document.getElementById('password-input')
// const nameEl = document.getElementById('name-input')

// let users = {};

// // функция конструктор
// function User(loginEl, passwordEl, nameEl) {
//     this.login = loginEl;
//     this.password = passwordEl;
//     this.name = nameEl;
// }

// // Создаем id для пользователя
// function createId(users) {
//     // При вызове возращает количество ключей в нашем обьекте
//     return Object.keys(users).length;
// }

// // Создаем нового пользователя
// buttonElement.addEventListener('click', () => {
//     const loginUser = loginEl.value;
//     const passUser = passwordEl.value;
//     const nameUser = nameEl.value;
    
//     const user = new User(loginUser, passUser, nameUser)

//      // Получаем id user
//      const userId = 'User' + createId(users);
//     //  Добавляем нового пользователя в наш объект
//     users[userId] = user;
//     console.log(users);
// })