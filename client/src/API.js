//Get all threads
export async function getUser() {
  const response = await fetch('/api/getuser');
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