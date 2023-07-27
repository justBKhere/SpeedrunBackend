// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/authUtils';
import UserService from '../services/userService';

const UserController = {
    async register(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            // Check if the username already exists
            const existingUser = await UserService.findByUsername(username);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists.' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create the user
            const newUser = await UserService.create(username, hashedPassword);

            return res.json({ message: 'User registered successfully.', user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            // Find the user by username
            const user = await UserService.findByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed: Invalid credentials.' });
            }

            // Check if the password is valid
            const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Authentication failed: Invalid credentials.' });
            }

            // Generate and issue a token upon successful authentication
            const token = generateToken(user._id);
            return res.json({ message: 'Authentication successful.', token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
};

export default UserController;
