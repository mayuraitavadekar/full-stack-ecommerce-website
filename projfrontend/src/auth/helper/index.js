import { API } from "../../backend";

// this is first time I ever done such thing in my life. It is most important.
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }) // if everything goes right then else catch error
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR IN FRONT END SIGN IN -> " + err);
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }) // if everything goes right then else catch error
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log("ERROR IN FRONT END SIGN IN -> " + err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    // access the localstorage of react
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();
  }

  // log out from backend

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((response) => {
      console.log("signout success");
    })
    .catch((err) => {
      console.log("ERROR IN SIGNOUT ->" + err);
    });
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
