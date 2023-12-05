import { APICore } from "./apiCore";

const api = new APICore();

// account
async function login(params: { username: string; password: string }) {
  // Request the CSRF token
  const csrfResponse = await fetch('/csrf-token');
  const csrfData = await csrfResponse.json();
  const csrfToken = csrfData.csrfToken;

  // Log the CSRF token
  console.log('CSRF Token:', csrfToken);

  // Include the CSRF token in the request headers
  const headers = {
    'Content-Type': 'application/json',
    'csrf-token': csrfToken
  };

  const baseUrl = "/login/";
  return api.create(`${baseUrl}`, params, headers);
}

function logout() {
  const baseUrl = "/logout/";
  return api.create(`${baseUrl}`, {});
}

function signup(params: { fullname: string; email: string; password: string }) {
  const baseUrl = "/register/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { username: string }) {
  const baseUrl = "/forget-password/";
  return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword };
