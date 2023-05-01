const host = "https://webdev-hw-api.vercel.app/api/v2/kolesnichenko-a/comments";
const userHost = " https://webdev-hw-api.vercel.app/api/user/login";
const RegNewUser = "https://webdev-hw-api.vercel.app/api/user";

export function getRender({ token }){
    return fetch(host, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        })
    }