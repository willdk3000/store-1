// AUTH ENDPOINTS
export function getUser() {
  const response = fetch('/api/getuser');
  return response;
};

export function logout() {
  const response = fetch('/api/logout');
  return response;
};

export function login() {
  const response = fetch('/auth/google', {
    mode: 'no-cors',
  });
  return response
}

export function secret() {
  const response = fetch('/api/getsecret');
  return response
}

// PAYMENT ENDPOINTS
export function sendStripeToken(token) {
  const response = fetch('/api/sendStripeToken', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'token': token
    })
  });
  return response
};
