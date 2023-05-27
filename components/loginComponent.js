import { loginUser, registerUser } from "../api.js";

//на страницу входа
export function renderLoginIn({ appEl, setToken, setUser, apiGet }) {
  const appHtml = `
  <div id="add-form" class="add-form">
  <input id="login-input" type="text" class="add-form-name" placeholder="Введите ваш логин" />
  <input id="password" type="text" class="add-form-name" placeholder="Введите ваш пароль" />
  <div class="add-form-row">
    <button id="login-button" class="add-form-button">Войти</button>
    <button id="buttonReg" class="add-form-button">Пройти регистрацию</button>
  </div>`;
  appEl.innerHTML = appHtml;

  document.getElementById("login-button").addEventListener("click", () => {
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password").value;
    console.log("click");
    if (!login) {
      alert("ВВЕДИТЕ ЛОГИН");
      return;
    }
    if (!password) {
      alert("ВВЕДИТЕ ПАРОЛЬ");
      return;
    }

    loginUser({
      login: login,
      password: password,
    })
      .then((user) => {
        console.log(user);
        setToken(`Bearer ${user.user.token}`);
        setUser(user);
        apiGet();
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
  buttonReg.addEventListener("click", () => {
    renderLoginReg({
      appEl,
      setToken,
      apiGet,
    });

    return;
  });
}

//на страницу регистрации
export function renderLoginReg({ appEl, setToken, apiGet }) {
  const appHtml = `
  <div id="add-form" class="add-form">
  <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
  <input id="login-input" type="text" class="add-form-name" placeholder="Введите ваш логин" />
  <input id="password" type="text" class="add-form-name" placeholder="Введите ваш пароль" />
  <div class="add-form-row">
    <button id="buttonIn" class="add-form-button">Перейти на страницу входа</button>
    <button id="button-toggler" class="add-form-button">Зарегистрировать нового пользователя</button>
  </div>`;
  appEl.innerHTML = appHtml;

  document.getElementById("buttonIn").addEventListener("click", () => {
    renderLoginIn({
      appEl,
      setToken,
      setUser,
    });

    return;
  });

  document.getElementById("button-toggler").addEventListener("click", () => {
    const login = document.getElementById("login-input").value;
    const password = document.getElementById("password").value;
    const nameUser = document.getElementById("name-input").value;
    if (!login) {
      alert("ВВЕДИТЕ ЛОГИН");
      return;
    }
    if (!password) {
      alert("ВВЕДИТЕ ПАРОЛЬ");
      return;
    }
    if (!nameUser) {
      alert("ВВЕДИТЕ ИМЯ");
      return;
    }
    registerUser({
      login: login,
      password: password,
      name: nameUser,
    })
      .then((user) => {
        console.log(user);
        setToken(`Bearer ${user.user.token}`);
        setUser(user);
        apiGet();
      })
      .catch((error) => {
        console.error(error.message);
      });
  });
}
