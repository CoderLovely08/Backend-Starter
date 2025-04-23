import { prisma } from '@/config/app.config.js';

export class PermissionService {
  /**
   * Get all permissions
   * @returns {Promise<Array>} - An array of permissions
   */
  static async getAllPermissions() {
    const permissions = await prisma.permission.findMany();
    return permissions;
  }

  /**
   * Create a new permission
   * @param {Object} permission - The permission to create
   * @returns {Promise<Object>} - The created permission
   */
  static async createPermission(permission) {
    const newPermission = await prisma.permission.create({ data: permission });
    return newPermission;
  }
}
