import { LocalStorage, Cookies } from "quasar";

export async function loginUsers(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/login`,
      method: "post",
      // headers: {},
      detailed: true,
      data: payload,
      handler: async (data) => {
        // Response data can be modified here before adding it to the store

        console.log("SUCCCESS LOG", data);

        const decodeToken = await context.dispatch("jwtDecode", data);
        LocalStorage.set("access_token", data);

        const userData = decodeToken;
        userData.token = data;

        const user = decodeToken.username;
        context.commit("userLogin", user);
      },
    },
    { root: true }
  );
}

export async function getQuestions(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/get-questions`,
      method: "get",
      // headers: {},
      detailed: true,
      data: payload,
      handler: async (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function submitScore(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/submit-score`,
      method: "post",
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      detailed: true,
      data: payload,
      handler: (data) => {
        // Response data can be modified here before adding it to the store
        return data;
      },
    },
    { root: true }
  );
}

export async function logout(context, payload) {
  let apiHost = process.env.API_HOST;
  if (process.env.DEV) {
    apiHost = process.env.DEV_HOST;
  }
  return await context.dispatch(
    "helpers/request",
    {
      url: `${apiHost}/logout`,
      headers: {
        Authorization: `Bearer ${context.rootState.users.userAccount.token}`,
      },
      method: "post",
      // headers: {},
      handler: async (data) => {
        LocalStorage.clear();
        Cookies.remove("student_no");
        context.commit("userLogin", {});
        // context.commit("studentPicture", {});
      },
    },
    { root: true }
  );
}

export async function jwtDecode(context, token) {
  var base64Url = token.split(".")[1];

  // Palitan ang mga character para sa base64url
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Idagdag ang padding kung kinakailangan
  while (base64.length % 4) {
    base64 += "=";
  }

  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export async function setUserData(context) {
  const token = LocalStorage.getItem("access_token");
  const decodeToken = await context.dispatch("jwtDecode", token);
  const studentData = decodeToken;
  studentData.token = token;
  context.commit("userLogin", studentData);
}
