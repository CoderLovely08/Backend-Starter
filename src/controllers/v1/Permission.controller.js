import { APIResponse } from '@/service/core/CustomResponse.js';
import { PermissionService } from '@/service/v1/permission.service.js';

export class PermissionController {
  static async getAllPermissions(req, res) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      return APIResponse.success(res, permissions, 'Permissions fetched successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  static async createPermission(req, res) {
    try {
      const { name } = req.body;
      const permission = await PermissionService.createPermission({ name });
      return APIResponse.success(res, permission, 'Permission created successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }
}
