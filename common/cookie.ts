import Cookies from 'js-cookie'

const saveTokenToCookie = (token: string) => {
  Cookies.set('Authorization', "Bearer " + token, { expires: 7 }); // Token sẽ hết hạn sau 7 ngày
};

// Lấy token từ cookie
const getTokenFromCookie = () => {
  return Cookies.get('Authorization');
};

// Xóa token khỏi cookie
const removeTokenFromCookie = () => {
  Cookies.remove('Authorization');
};

export { saveTokenToCookie, getTokenFromCookie, removeTokenFromCookie }