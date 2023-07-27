// src/services/userService.ts
import UserModel, { User } from '../dbms/models/user';

const UserService = {
    async create(username: string, hashedPassword: string): Promise<User> {
        try {
            return await UserModel.create({ username, hashedPassword });
        } catch (error) {
            throw new Error('Failed to create user.'); // Custom error message
        }
    },

    async findByUsername(username: string): Promise<User | null> {
        try {
            return await UserModel.findOne({ username });
        } catch (error) {
            throw new Error('Failed to find user.'); // Custom error message
        }
    },
};

export default UserService;
