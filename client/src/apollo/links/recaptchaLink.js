import { setContext } from 'apollo-link-context';

const recaptchaLink = setContext((operation, previousContext) => {
  const { headers, recaptcha } = previousContext;
  if (!recaptcha) {
    return previousContext;
  }

  return {
    ...previousContext,
    headers: {
      ...headers,
      'g-recaptcha-response': recaptcha
    }
  };
});

export default recaptchaLink;
