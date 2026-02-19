import { prisma } from '@/config/app.config.js';
import { CustomError } from '@/service/core/CustomResponse.js';
import { PRISMA_ERROR_CODES } from '@/utils/constants/app.constant.js';
import { hashPassword } from '@/utils/helpers/app.helpers.js';

export class UserService {
  /**
   * Get all users (excluding soft-deleted users)
   * @returns {Promise<Array>} - A list of users
   */
  static async getAllUsers() {
    try {
      const users = await prisma.systemUser.findMany({
        where: { isDeleted: false },
        select: {
          id: true,
          fullName: true,
          email: true,
          isActive: true,
          userType: {
            select: {
              id: true,
              name: true,
            },
          },
          permissions: {
            select: {
              permission: {
                select: { id: true, name: true, slug: true },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });
      const usersWithPermissions = users.map((user) => {
        const userPermissions = user.permissions.map((permission) => permission.permission);
        return { ...user, permissions: userPermissions };
      });
      return usersWithPermissions;
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  }

  /**
   * Get a user by id
   * @param {number} id - The id of the user
   * @returns {Promise<Object>} - The user
   */
  static async getUserById(id) {
    try {
      const user = await prisma.systemUser.findFirst({
        where: {
          id,
          isDeleted: false,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          isActive: true,
          userType: {
            select: {
              id: true,
              name: true,
            },
          },
          permissions: {
            select: {
              permission: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        throw new CustomError('User not found', 404);
      }

      const userPermissions = user.permissions.map((permission) => permission.permission);
      return { ...user, permissions: userPermissions };
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @param {string} userData.fullName - Full name
   * @param {string} userData.email - Email
   * @param {string} userData.password - Password
   * @param {number} userData.userTypeId - User type ID
   * @returns {Promise<Object>} - The created user
   */
  static async createUser({ fullName, email, password, userTypeId }) {
    try {
      // Check if user type exists
      const userType = await prisma.userType.findUnique({
        where: { id: userTypeId },
      });

      if (!userType || !userType.isActive) {
        throw new CustomError('Invalid or inactive user type', 400);
      }

      // Hash password
      const hashedPassword = hashPassword(password);

      // Create user
      const newUser = await prisma.systemUser.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
          userTypeId,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          isActive: true,
          userType: {
            select: {
              id: true,
              name: true,
            },
          },
          createdAt: true,
        },
      });

      return newUser;
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.P2002.code) {
        throw new CustomError('Email already exists', 400);
      }
      if (error.code === PRISMA_ERROR_CODES.P2003.code) {
        throw new CustomError('Invalid user type', 400);
      }
      throw new CustomError(error.message, error.statusCode || 500);
    }
  }

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} - The updated user
   */
  static async updateUser(id, userData) {
    try {
      // Verify user exists and is not deleted
      const existingUser = await prisma.systemUser.findFirst({
        where: { id, isDeleted: false },
      });

      if (!existingUser) {
        throw new CustomError('User not found', 404);
      }

      // If userTypeId is being updated, verify it exists and is active
      if (userData.userTypeId) {
        const userType = await prisma.userType.findUnique({
          where: { id: userData.userTypeId },
        });
        if (!userType || !userType.isActive) {
          throw new CustomError('Invalid or inactive user type', 400);
        }
      }

      // Update user
      const updatedUser = await prisma.systemUser.update({
        where: { id },
        data: userData,
        select: {
          id: true,
          fullName: true,
          email: true,
          isActive: true,
          userType: {
            select: {
              id: true,
              name: true,
            },
          },
          permissions: {
            select: {
              permission: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                },
              },
            },
          },
          updatedAt: true,
        },
      });

      const userPermissions = updatedUser.permissions.map((p) => p.permission);
      return { ...updatedUser, permissions: userPermissions };
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.P2002.code) {
        throw new CustomError('Email already exists', 400);
      }
      if (error.code === PRISMA_ERROR_CODES.P2025.code) {
        throw new CustomError('User not found', 404);
      }
      throw new CustomError(error.message, error.statusCode || 500);
    }
  }

  /**
   * Soft delete a user
   * @param {number} id - User ID
   * @returns {Promise<Object>} - Success message
   */
  static async deleteUser(id) {
    try {
      const user = await prisma.systemUser.findFirst({
        where: { id, isDeleted: false },
      });

      if (!user) {
        throw new CustomError('User not found', 404);
      }

      await prisma.systemUser.update({
        where: { id },
        data: {
          isDeleted: true,
          deletedAt: new Date(),
          isActive: false,
        },
      });

      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new CustomError(error.message, error.statusCode || 500);
    }
  }
}
