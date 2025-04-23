import { prisma } from '@/config/app.config.js';
import { CustomError } from '@/service/core/CustomResponse.js';
import { PRISMA_ERROR_CODES } from '@/utils/constants/app.constant.js';

export class PermissionService {
  /**
   * Get all permissions
   * @returns {Promise<Array>} - An array of permissions
   */
  static async getAllPermissions() {
    const permissions = await prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
      },
    });
    return permissions;
  }

  /**
   * Create a new permission
   * @param {Object} permission - The permission to create
   * @returns {Promise<Object>} - The created permission
   */
  static async createPermission(permission) {
    try {
      const newPermission = await prisma.permission.create({ data: permission });
      return newPermission;
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.P2002.code) {
        throw new CustomError('Permission already exists', 400);
      }
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Assign permissions to a user
   * @param {integer} userId - The id of the user
   * @param {integer} permissionId - The id of the permission
   * @returns {Promise<Object>} - The created permission
   */
  static async assignPermissions(userId, permissionIds) {
    try {
      const user = await prisma.systemUser.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error('User not found');
      }

      const assignedPermission = await prisma.$transaction(async (tx) => {
        const deletedPermission = await tx.userPermission.deleteMany({
          where: {
            userId,
          },
        });
        const createdPermission = await tx.userPermission.createMany({
          data: permissionIds.map((permissionId) => ({
            userId,
            permissionId,
          })),
        });
        return createdPermission;
      });

      return assignedPermission;
    } catch (error) {
      if (error.code === PRISMA_ERROR_CODES.P2003.code) {
        if (error?.meta?.field_name?.includes('UserPermission_permissionId_fkey'))
          throw new CustomError('Invalid permission id', 400);
      }
      throw new CustomError(error.message, error.statusCode);
    }
  }

  /**
   * Delete all permissions
   * @returns {Promise<Object>} - The created permission
   */
  static async deleteAllPermissions() {
    try {
      await prisma.permission.deleteMany();
    } catch (error) {
      throw new CustomError(error.message, error.statusCode);
    }
  }
}
