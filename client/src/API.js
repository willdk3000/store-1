//Get all threads
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