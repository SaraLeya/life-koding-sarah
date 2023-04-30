import { loginUser, registerUser } from "../1api.js";

export function renderLoginComponents ({ appEl, setToken, apiGet }){
  let isLoginMode = true;

const renderForm = () => {
  const appHtml = `
  <div class="container">
  
  <div id="pass" class="add-formPass">
  <h2>${isLoginMode ? 'Форма входа' : 'Регистрация'} </h2>
  <input id="login-input" type="text" class="add-form-userName" 
  placeholder="Введите логин"></input>
  <input id="password" type="password" class="add-form-userPass" placeholder="Введите ваш пароль" rows="1"></input>
          <div class="add-form-row">
  <button id="login-button" class="add-form-button">${isLoginMode ? 'Войти' : 'Регистрация'}</button>
  <button id="toggle-button" class="add-form-button">${isLoginMode ? 'К регистрации' : 'Ко входу'}</button>
          </div>
        </div>`;
    appEl.innerHTML = appHtml;
    
document.getElementById('login-button').addEventListener('click', () => {
  if(isLoginMode){
    const login = document.getElementById('login-input').value;
    const password = document.getElementById('password').value;
    if (!login)  {
      alert('ВВЕДИТЕ ЛОГИН');
      return;
    }
    if (!password)  {
      alert('ВВЕДИТЕ ПАРОЛЬ');
      return;
    }
    
    loginUser ({
    login:'login',
    password:'password',
    })
    .then((user) => {
    console.log(user);
    setToken(`Bearer ${user.user.token}`);
    apiGet();
    })
    .catch((error) => {
    //вывести красивый алерт 
    alert(error.message);
    });
  } else {

    const login = document.getElementById('login-input').value;
    const password = document.getElementById('password').value;
    if (!login)  {
      alert('ВВЕДИТЕ ЛОГИН');
      return;
    }
    if (!password)  {
      alert('ВВЕДИТЕ ПАРОЛЬ');
      return;
    }
    
    registerUser ({
    login:'login',
    password:'password',
    name:'name',
    })
    .then((user) => {
    console.log(user);
    setToken(`Bearer ${user.user.token}`);
    apiGet();
    })
    .catch((error) => {
    //вывести красивый алерт 
    alert(error.message);
    });

  }
});
    document.getElementById('toggle-button').addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    renderForm();
    });
  };

renderForm();
}

