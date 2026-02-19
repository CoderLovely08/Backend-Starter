/**
 * Permission Constants
 *
 * Centralized permission definitions following the pattern: resource:action
 * These constants should be used across the application for permission checks
 */

export const PERMISSIONS = Object.freeze({
  // User Management Permissions
  USERS_CREATE: 'users:create',
  USERS_READ: 'users:read',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',

  // Permission Management Permissions
  PERMISSIONS_CREATE: 'permissions:create',
  PERMISSIONS_READ: 'permissions:read',
  PERMISSIONS_DELETE: 'permissions:delete',
  PERMISSIONS_ASSIGN: 'permissions:assign',
});

/**
 * Permission Definitions for Database Seeding
 *
 * Array of permission objects that will be seeded into the database
 * Each permission has a name (display name), slug (unique identifier), and description
 */
export const PERMISSION_DEFINITIONS = [
  {
    name: 'Create Users',
    slug: PERMISSIONS.USERS_CREATE,
    description: 'Allows creating new users in the system',
  },
  {
    name: 'View Users',
    slug: PERMISSIONS.USERS_READ,
    description: 'Allows viewing user information and user lists',
  },
  {
    name: 'Update Users',
    slug: PERMISSIONS.USERS_UPDATE,
    description: 'Allows updating existing user information',
  },
  {
    name: 'Delete Users',
    slug: PERMISSIONS.USERS_DELETE,
    description: 'Allows soft-deleting users from the system',
  },
  {
    name: 'Create Permissions',
    slug: PERMISSIONS.PERMISSIONS_CREATE,
    description: 'Allows creating new permissions in the system',
  },
  {
    name: 'View Permissions',
    slug: PERMISSIONS.PERMISSIONS_READ,
    description: 'Allows viewing all available permissions',
  },
  {
    name: 'Delete Permissions',
    slug: PERMISSIONS.PERMISSIONS_DELETE,
    description: 'Allows deleting permissions from the system',
  },
  {
    name: 'Assign Permissions',
    slug: PERMISSIONS.PERMISSIONS_ASSIGN,
    description: 'Allows assigning and revoking permissions to/from users',
  },
];
