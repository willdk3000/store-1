// AUTH ENDPOINTS
export function getUser() {
  const response = fetch('/api/getuser');
  return response;
};

export function logout() {
  const response = fetch('/api/logout');
  return response;
};

export async function login() {
  const response = await fetch('/auth/google', {
    mode: 'no-cors',
  });
  return response
}

export function secret() {
  const response = fetch('/api/getsecret');
  return response
}

// PAYMENT ENDPOINTS

// Buy credits
export function sendStripeToken(token, user) {
  const response = fetch('/api/sendStripeToken', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      'token': token,
      'user': user
    })
  });
  return response
};


// MAILER ENDPOINTS

//Send survey
export async function sendSurvey(survey) {
  const response = await fetch('/api/surveys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      survey
    })
  });
  return response
}