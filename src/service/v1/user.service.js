import { prisma } from '@/config/app.config.js';
import { CustomError } from '@/service/core/CustomResponse.js';

export class UserService {
  /**
   * Get all users
   * @returns {Promise<Array>} - A list of users
   */
  static async getAllUsers() {
    try {
      const users = await prisma.systemUser.findMany({
        select: {
          id: true,
          fullName: true,
          email: true,
          userType: {
            select: {
              name: true,
            },
          },
          createdAt: true,
        },
      });
      return users;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Get a user by id
   * @param {string} id - The id of the user
   * @returns {Promise<Object>} - The user
   */
  static async getUserById(id) {
    try {
      const user = await prisma.systemUser.findUnique({
        where: { id },
        select: {
          id: true,
          fullName: true,
          email: true,
          userType: {
            select: { name: true },
          },
          createdAt: true,
        },
      });
      return user;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }
}
