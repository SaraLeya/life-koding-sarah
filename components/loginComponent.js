export function renderLoginComponents ({ appEl, setToken }){
    const appHtml = `
    <div class="container">
    
    <div id="pass" class="add-formPass">
            <input id="userName" type="text" class="add-form-userName" placeholder="Введите логин" />
            <textarea id="userPass"
              type="textarea"
              class="add-form-userPass"
              placeholder="Введите ваш пароль"
              rows="1"></textarea>
            <div class="add-form-row">
              <button id="login-button" class="add-form-button">Войти</button>
            </div>
          </div>`;
      appEl.innerHTML = appHtml;
  document.getElementById('login-button').addEventListener('click', () => {

    setToken("Bearer ksdfsksdfjfsdjk");
    apiGet();
    //не находит, хотя компонент вынесла в функцию
  });
}