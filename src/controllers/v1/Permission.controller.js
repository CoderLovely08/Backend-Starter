import { APIResponse } from '@/service/core/CustomResponse.js';
import { PermissionService } from '@/service/v1/permission.service.js';

export class PermissionController {
  /**
   * Get all permissions
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} - The list of permissions
   */
  static async getAllPermissions(req, res, next) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      return APIResponse.success(res, permissions, 'Permissions fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new permission
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} - The created permission
   */
  static async createPermission(req, res, next) {
    try {
      const { name, slug, description } = req.body;
      const permission = await PermissionService.createPermission({ name, slug, description });
      return APIResponse.success(res, permission, 'Permission created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Assign permissions to a user
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} - Success message with count
   */
  static async assignPermissions(req, res, next) {
    try {
      const { userId, permissions } = req.body;

      const permission = await PermissionService.assignPermissions(userId, permissions);
      return APIResponse.success(res, permission, 'Permissions assigned successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete all permissions (DANGEROUS OPERATION)
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} - Success message
   */
  static async deleteAllPermissions(req, res, next) {
    try {
      await PermissionService.deleteAllPermissions();
      return APIResponse.success(res, null, 'All permissions deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
