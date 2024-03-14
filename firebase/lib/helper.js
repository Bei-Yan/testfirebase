export function checkInValidUser() {
  const expiryDate=localStorage.getItem('TOKEN_EXPIRY');
  let now = new Date();
  now = now.setTime(now.getTime());
  if (expiryDate!=null && now>expiryDate) {
    localStorage.removeItem('USER');
    localStorage.removeItem('TOKEN_EXPIRY');
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_NAME');
    return true;
  }
  return false;
}

