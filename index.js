import { getRender, postCom } from "./api.js";
import { renderLoginReg, renderLoginIn } from "./components/loginComponent.js";

let commentsContainer;

const host = "https://webdev-hw-api.vercel.app/api/v2/kolesnichenko-a/comments";
let token;
let user;

function apiGet() {
  return getRender({ token }).then((response) => {
    commentsContainer = response.comments;

    renderApp();
  });
}

apiGet();

function renderApp() {
  const appEl = document.getElementById("app");
  if (!token) {
    const commentsContainerHtml = commentsContainer
      .map((commentUser, id) => {
        return `<li data-id="${id}" class="comment">
      <div class="comment-header">
        <div>${commentUser.author.name} </div>
        <div>
          ${timeComment(commentUser.date)}
          </div>
      </div>
      <div class="comment-body">
        <div style="white-space: pre-line" class="comment-text">
          ${commentUser.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${commentUser.likes}</span>
          <button data-id="${id}" class="${
          commentUser.isLiked ? "like-button -active-like" : "like-button"
        }"></button>
        </div>
      </div>
    </li>`;
      })
      .join("");

    const appHtml = ` 
<div class="container">
<ul id="list" class="comments">
  ${commentsContainerHtml}
</ul>
<h4>необходимо <span id="buttonIn">войти</span> в аккаунт или <span id="buttonReg">зарегистрироваться</span></h4>
</div>`;
    appEl.innerHTML = appHtml;
    let buttonIn = document.getElementById("buttonIn");
    const buttonReg = document.getElementById("buttonReg");

    buttonIn.addEventListener("click", () => {
      renderLoginIn({
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
        setUser: (newUser) => {
          user = newUser;
        },
        apiGet,
      });

      return;
    });
    buttonReg.addEventListener("click", () => {
      renderLoginReg({
        appEl,
        setToken: (newToken) => {
          token = newToken;
        },
        setUser: (newUser) => {
          user = newUser;
        },
        apiGet,
      });

      return;
    });
  } else {
    const commentsContainerHtml = commentsContainer
      .map((commentUser, id) => {
        return `<li data-id="${id}" class="comment">
      <div class="comment-header">
        <div>${commentUser.author.name} </div>
        <div>
          ${timeComment(commentUser.date)}
          </div>
      </div>
      <div class="comment-body">
        <div style="white-space: pre-line" class="comment-text">
          ${commentUser.text}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${commentUser.likes}</span>
          <button data-id="${id}" class="${
          commentUser.isLiked ? "like-button -active-like" : "like-button"
        }"></button>
        </div>
      </div>
    </li>`;
      })
      .join("");

    const appHtml = `
<div class="container">
<p id="loaderStart" class="loaderStart">ЗАГРУЗКА...</p>
<ul id="list" class="comments">
  ${commentsContainerHtml}
</ul>
<div id="loaderComments" class="loaderComments">Комментарий загружается</div>
<div id="add-form" class="add-form">
  <input id="inputName" value=${user.user.name} disabled type="text" class="add-form-name" placeholder="Введите ваше имя" />
  <textarea id="inputComment" type="textarea" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
  <div class="add-form-row">
    <button id="buttonComent" class="add-form-button">Написать</button>
  </div>
</div>
</div>`;
    appEl.innerHTML = appHtml;

    let buttonElement = document.getElementById("buttonComent");

    const commentElement = document.getElementById("inputComment");
    const loaderComments = document.querySelector(".loaderComments");
    const loaderStart = document.querySelector(".loaderStart");

    loaderComments.style.display = "none";
    loaderStart.style.display = "none";

    buttonElement.addEventListener("click", () => {
      if (commentElement.value === "") {
        commentElement.classList.add("error");
        return;
      }
      buttonPost(commentElement);
    });
  }
}

function buttonPost(commentElement) {
  return postCom({
    text: commentElement.value,
    token,
  })
    .then(() => {
      commentElement.value = "";
      apiGet();
    })
    .catch((error) => {
      if (
        error ===
        "Сервер не работает. Проверьте подключение и попробуйте еще раз"
      ) {
        console.error(error);
        return;
      }
      if (error === "Мало букв") {
        console.error(error);
        return;
      }
      console.error(error);
      alert("Кажется, у вас сломался интернет, попробуйте позже");
      return;
    });
}

function timeComment() {
  let myTime = 0;
  let myDate = new Date();
  let day = myDate.getDate();
  let month = myDate.getMonth();
  let year = myDate.getFullYear();
  let hour = myDate.getHours();
  let minute = myDate.getMinutes();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  myTime = day + "." + month + "." + year + " " + hour + ":" + minute;
  return myTime;
}
