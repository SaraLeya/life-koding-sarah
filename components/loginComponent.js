import { loginUser } from "../1api.js";

export function renderLoginComponents ({ appEl, setToken }){
    const appHtml = `
    <div class="container">
    
    <div id="pass" class="add-formPass">
            <input id="login-input" type="text" class="add-form-userName" 
            placeholder="Введите логин"></input>
            <input id="password"
              type="password"
              class="add-form-userPass"
              placeholder="Введите ваш пароль"
              rows="1"></input>
            <div class="add-form-row">
              <button id="login-button" class="add-form-button">Войти</button>
            </div>
          </div>`;
      appEl.innerHTML = appHtml;
  document.getElementById('login-button').addEventListener('click', () => {
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
});
}