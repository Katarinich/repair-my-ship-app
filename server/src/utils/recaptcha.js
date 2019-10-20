import axios from 'axios';

export function validateRecaptcha(response) {
  return axios.post(
    `https://www.google.com/recaptcha/api/siteverify?response=${response}&secret=${process.env.GOOGLE_RECAPTCHA_SECRET_KEY}`
  );
}
