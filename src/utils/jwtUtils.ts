import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/jwtPayload'; // Adjust the import path as necessary

// Function to generate JWT
export const generateJWT = (user: UserPayload): string => {
  // Define the payload with the user information
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || "123ABCD", { expiresIn: '1h' });
};
