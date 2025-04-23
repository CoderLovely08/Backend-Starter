import { APIResponse } from '@/service/core/CustomResponse.js';
import { PermissionService } from '@/service/v1/permission.service.js';

export class PermissionController {
  /**
   * Get all permissions
   * @param {Object} req.body - The request body
   * @returns {Object} - The created permission
   */
  static async getAllPermissions(req, res) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      return APIResponse.success(res, permissions, 'Permissions fetched successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Create a new permission
   * @param {Object} req.body - The request body
   * @param {string} req.body.name - The name of the permission
   * @returns {Object} - The created permission
   */
  static async createPermission(req, res) {
    try {
      const { name, slug, description } = req.body;
      const permission = await PermissionService.createPermission({ name, slug, description });
      return APIResponse.success(res, permission, 'Permission created successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Assign permissions to a user
   * @param {Object} req.body - The request body
   * @param {integer} req.body.userId - The id of the user
   * @param {integer} req.body.permissionId - The id of the permission
   * @returns {Object} - The created permission
   */
  static async assignPermissions(req, res) {
    try {
      const { userId, permissionIds } = req.body;

      const permission = await PermissionService.assignPermissions(userId, permissionIds);
      return APIResponse.success(res, permission, 'Permissions assigned successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Delete all permissions
   * @param {Object} req.body - The request body
   * @returns {Object} - The created permission
   */
  static async deleteAllPermissions(req, res) {
    try {
      await PermissionService.deleteAllPermissions();
      return APIResponse.success(res, null, 'All permissions deleted successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }
}
