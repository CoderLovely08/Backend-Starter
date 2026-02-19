import { prisma } from '@/config/app.config.js';
import { PRISMA_ERROR_CODES } from '@/utils/constants/app.constant.js';
import { comparePassword, hashPassword } from '@/utils/helpers/app.helpers.js';
import { CustomError } from '@/service/core/CustomResponse.js';

export class AuthService {
  // ------------------------------------------------------------
  // System User Onboarding
  // ------------------------------------------------------------

  /**
   * Validate a system user
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @returns {Promise<SystemUsersInfo>} The validated system user
   */
  static async validateSystemUser(email: string, password: string) {
    try {
      const user = await prisma.systemUser.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          password: true,
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
        },
      });

      if (!user) {
        throw new CustomError('User does not exist', 404);
      }

      const isPasswordValid = await comparePassword(password, user.password);

      if (!isPasswordValid) {
        throw new CustomError('Invalid password', 401);
      }

      const { password: _, ...userWithoutPassword } = user;

      const userPermissions = user?.permissions?.map((permission) => permission?.permission?.slug);

      return { ...userWithoutPassword, permissions: userPermissions };
    } catch (error: any) {
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Create a system user
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @param {string} fullName - The full name of the user
   * @param {number} userTypeId - The user type id of the user
   * @returns {Promise<SystemUsersInfo>} The created system user
   */
  static async createSystemUser(email: string, password: string, fullName: string, userTypeId: number) {
    try {
      const hashedPassword = hashPassword(password);

      const user = await prisma.systemUser.create({
        data: {
          email,
          password: hashedPassword,
          fullName,
          userType: {
            connect: {
              id: userTypeId,
            },
          },
        },
      });

      const { password: _, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error: any) {
      if (error.code === PRISMA_ERROR_CODES.P2002.code) {
        if (error.meta.target.includes('system_user_email')) {
          throw new CustomError('Email already exists', 400);
        }
      }

      if (error.code === PRISMA_ERROR_CODES.P2025.code) {
        throw new CustomError('User type does not exist', 400);
      }

      throw new CustomError(`Error creating system user: ${error.message}`, error.statusCode);
    }
  }

  // ------------------------------------------------------------
  // Update Reset Token
  // ------------------------------------------------------------

  /**
   * Update reset token
   * @param {string} email - The email of the user
   * @param {string} resetToken - The reset token of the user
   * @returns {Promise<ParentsInfo>} The updated user
   */
  static async authUpdateResetToken(email: string, resetToken: string) {
    try {
      const updatedUser = await prisma.systemUser.update({
        where: {
          email: email,
        },
        data: {
          resetToken,
          resetTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
      });

      if (!updatedUser) {
        throw new CustomError('Failed to update reset token', 400);
      }

      return updatedUser;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new CustomError('Email does not exist', 404);
      }

      throw new CustomError(`Error updating reset token: ${error.message}`, error.statusCode);
    }
  }

  // ------------------------------------------------------------
  // Update User Password
  // ------------------------------------------------------------

  /**
   * Update user password
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @returns {Promise<ParentsInfo>} The updated user
   */
  static async authUpdateUserPassword(email: string, password: string) {
    try {
      const hashedPassword = hashPassword(password);

      const updatedUser = await prisma.systemUser.update({
        where: {
          email: email,
        },
        data: {
          password: hashedPassword,
          resetToken: null,
          resetTokenExpiresAt: null,
        },
      });

      if (!updatedUser) {
        throw new CustomError('Failed to update password', 400);
      }

      return updatedUser;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new CustomError('Email does not exist', 404);
      }

      throw new CustomError(`Error updating password: ${error.message}`, error.statusCode);
    }
  }

  // ------------------------------------------------------------
  // Check if email exists
  // ------------------------------------------------------------

  /**
   * Check if email exists
   * @param {string} email - The email of the user
   * @returns {Promise<ParentsInfo>} The user if email exists
   */
  static async authCheckIfEmailExists(email: string) {
    try {
      const user = await prisma.systemUser.findUnique({
        where: { email },
        select: {
          id: true,
          fullName: true,
          email: true,
          resetToken: true,
          resetTokenExpiresAt: true,
        },
      });

      if (!user) {
        throw new CustomError('Email does not exist', 404);
      }

      return user;
    } catch (error: any) {
      throw new CustomError(`Error checking if email exists: ${error.message}`, error.statusCode);
    }
  }
}
