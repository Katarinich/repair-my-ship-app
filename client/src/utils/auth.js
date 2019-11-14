import jwt from 'jsonwebtoken';

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getUser(token = getToken()) {
  try {
    return jwt.decode(token);
  } catch (e) {
    return null;
  }
}
