import { APIResponse } from '@/service/core/CustomResponse.js';

export class PermissionController {
  static async getAllPermissions(req, res) {
    try {
      return APIResponse.success(res, null, 'Permissions fetched successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }
}
