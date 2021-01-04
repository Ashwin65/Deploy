import { BASE_URL } from "./Config";

export default function Api(path, params, method, token) {
  console.log("Api started");

  let options;
  options = {
    headers: {
      "Content-type":
        "application/json;Access-Control-Allow-Origin: *; charset=UTF-8",

      ...(token && { Authorization: token })
    },

    method: method,
    ...(params && { body: JSON.stringify(params) })
  };

  console.log("url " + BASE_URL + path + " options " + JSON.stringify(options));

  return fetch(BASE_URL + path, options)
    .then(resp => resp.json())
    .catch(error => {
      console.error(error);
    });
}
