import jwt from 'jsonwebtoken';
//import Cookies from "js-cookie"



const SECRET = process.env.JWT_SECRET || 'mysecretkey';

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '1d' });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

// export function isLoggedIn() {
//   const cookieStore = cookies();
//   const token = cookieStore.get('token');
// if(!token)
// {
//  return false;
// }
// return true;
// }