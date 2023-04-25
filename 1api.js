
const host = "https://webdev-hw-api.vercel.app/api/v2/kolesnichenko-a/comments";

export function getRender({ token }){
    return fetch(host, {
        method: "GET",
        headers: {
          AAuthorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
        
}

export postCom ({ text, token }){
   return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          text,
          //name: nameElement.value,
          //forceError: true,
        }),
        headers: {
            AAuthorization: token,
          },
      })
        .then((response) => {
          if (response.status === 500) {
            loaderComments.style.display = "none";
            alert("Сервер не работает. Проверьте подключение и попробуйте еще раз");
            return Promise.reject(
              "Сервер не работает. Проверьте подключение и попробуйте еще раз"
            );
          } else if (response.status === 400) {
            loaderComments.style.display = "none";
            alert("Мало букв");
            return Promise.reject("Мало букв");
          } else {
            loaderComments.style.display = "block";
            return response.json();
          }
        })
}