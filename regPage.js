import { renderLogin } from './loginPage.js';
import { registerUser, setToken, token } from './api.js';
import { setName, name } from './api.js';
import _ from 'lodash';



export const regLogin = ({ getAPI }) => {
    const rootElement = document.getElementById('root')
    const regHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="form__title">Форма регистрации</h3>
            <div class="form__input">
                <input type="text" id="name-input" class="input" placeholder="Введите имя" />
                <input type="text" id="login-input" class="input" placeholder="Введите логин" />
            <input
                type="text"
                id="password-input"
                class="input"
                placeholder="Введите пароль"/>
                <button class="reg__button" id="login-button">Создать аккаунт</button>
                <button class="login__button" id="button">Назад</button>
            </div> 
          </div>
    </div>` 
    rootElement.innerHTML = regHtml

// Клик по кнопке "Назад"
    const buttonLogin = document.getElementById('button');
    buttonLogin.addEventListener('click', () => {
       renderLogin({ getAPI }); 
    })

// Клик по кнопке "Создать аккаунт"
    const buttonEl = document.getElementById('login-button')
    buttonEl.addEventListener('click', () => {
    const name = document.getElementById('name-input').value;
    const login = document.getElementById('login-input').value;
    const password = document.getElementById('password-input').value;

    if (!name) {
        alert('Введите имя')
        return;
      }
      if (!login) {
        alert('Введите логин')
        return;
      }
      if (!password) {
        alert('Введите пароль')
        return;
      }

    registerUser({
        // name: name,
        name: _.capitalize(name),
        login: login,
        password: password,
      }).then((user) => {

        console.log(user.user.name)

        setName(_.capitalize(user.user.name))
        setToken(user.user.token)
        console.log(token);
      }).then(() => {
        getAPI(); 
    })
    })
}
























    // let users = {};

    // function User(loginEl, passwordEl, nameEl) {
    //     this.login = loginEl;
    //     this.password = passwordEl;
    //     this.name = nameEl;
    // }

    // function createId(users) {
    //     // При вызове возращает количество ключей в нашем обьекте
    //     return Object.keys(users).length;
    // }

    // buttonEl.addEventListener('click', () => {
    //     const loginUser = loginEl.value;
    //     const passUser = passwordEl.value;
    //     const nameUser = nameEl.value;
        
    //     const user = new User(loginUser, passUser, nameUser)

    //     const userId = 'User' + createId(users);
    //     users[userId] = user;
    //     console.log(users);
    //     getAPI();
    // })
