// src/utils/authUtils.ts
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_jwt_secret_key_here';

// Function to generate a JWT token
export const generateToken = (userId: string): string => {

    //sign the JWT token
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // You can customize the token expiration time as needed
    return token;
};
