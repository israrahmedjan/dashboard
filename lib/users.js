import bcrypt from 'bcryptjs';

const users = []; // Replace with real DB in production

export async function addUser(email, password) {
  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });
}

export function findUser(email) {
  return users.find(u => u.email === email);
}

export async function validateUser(email, password) {


    
//     console.log(email,password);
//  const user = findUser(email);
//  if (!user) return false;
//   return await bcrypt.compare(password, user.password);
return true;
}
