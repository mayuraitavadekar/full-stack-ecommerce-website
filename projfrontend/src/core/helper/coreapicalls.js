import { API } from "../../backend";

export const getProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log("ERROR IN GETTING ALL PRODUCTS -> " + error);
    });
};
