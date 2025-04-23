import { APIResponse } from '@/service/core/CustomResponse.js';
import { UserService } from '@/service/v1/user.service.js';

export class UserController {
  /**
   * Get all users
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return APIResponse.success(res, users, 'Users fetched successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Get a user by id
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      return APIResponse.success(res, user, 'User fetched successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Create a user
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async createUser(req, res) {
    try {
      return APIResponse.success(res, null, 'User created successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Update a user
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async updateUser(req, res) {
    try {
      return APIResponse.success(res, null, 'User updated successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }

  /**
   * Delete a user
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async deleteUser(req, res) {
    try {
      return APIResponse.success(res, null, 'User deleted successfully');
    } catch (error) {
      return APIResponse.error(res, error.message, error.statusCode);
    }
  }
}
