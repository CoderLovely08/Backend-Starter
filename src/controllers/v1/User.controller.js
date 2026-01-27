import { APIResponse, CustomError } from '@/service/core/CustomResponse.js';
import { UserService } from '@/service/v1/user.service.js';
import { getMockUsers } from '@/utils/mock/users.mock.js';

export class UserController {
  /**
   * Get all users
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async getAllUsers(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      return APIResponse.success(res, users, 'Users fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a mock data
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async getMock(req, res, next) {
    try {
      const { limit = 10, page = 1, search = '' } = req.query;
      const users = getMockUsers({ limit, page, search });

      return APIResponse.success(res, users, 'Mock data fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get a user by id
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @returns {Object} The response object
   */
  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      return APIResponse.success(res, user, 'User fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a user
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} The response object
   */
  static async createUser(req, res, next) {
    try {
      const { fullName, email, password, userTypeId } = req.body;
      const user = await UserService.createUser({
        fullName,
        email,
        password,
        userTypeId,
      });
      return APIResponse.success(res, user, 'User created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update a user
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} The response object
   */
  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const user = await UserService.updateUser(parseInt(id), updateData);
      return APIResponse.success(res, user, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a user (soft delete)
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   * @param {Function} next - The next middleware function
   * @returns {Object} The response object
   */
  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(parseInt(id));
      return APIResponse.success(res, null, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
