import { APIResponse } from '@/service/core/CustomResponse.js';
import { prisma } from '@/config/app.config.js';

export class UserTypeController {
  /**
   * Get all user types
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} - List of user types
   */
  static async getAllUserTypes(req, res, next) {
    try {
      const userTypes = await prisma.userType.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          description: true,
        },
        orderBy: { name: 'asc' },
      });

      return APIResponse.success(res, userTypes, 'User types fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
