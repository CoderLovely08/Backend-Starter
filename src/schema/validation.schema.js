import { CustomError } from '@/service/core/CustomResponse.js';
import { VALIDATION_TYPES } from '@/utils/constants/app.constant.js';
import { validatePhoneNumber } from '@/utils/helpers/app.helpers.js';

export class ValidationSchema {
  static idSchema = [{ field: 'id', type: VALIDATION_TYPES.INTEGER, required: true }];

  // Login Schema
  static loginSchema = [
    { field: 'email', type: VALIDATION_TYPES.EMAIL, required: true },
    { field: 'password', type: VALIDATION_TYPES.PASSWORD, required: true },
  ];

  // Forgot Password Schema
  static forgotPasswordSchema = [{ field: 'email', type: VALIDATION_TYPES.EMAIL, required: true }];

  // Simple User Onboarding Schema
  static simpleUserOnboardingSchema = [
    { field: 'fullName', type: VALIDATION_TYPES.PURE_NAME, required: true },
    { field: 'email', type: VALIDATION_TYPES.EMAIL, required: true },
    { field: 'password', type: VALIDATION_TYPES.PASSWORD, required: true },
    { field: 'userType', type: VALIDATION_TYPES.INTEGER, required: true },
  ];

  // Request Password Reset Schema
  static requestPasswordResetSchema = [
    { field: 'email', type: VALIDATION_TYPES.EMAIL, required: true },
  ];

  // Update Password Schema
  static updatePasswordSchema = [
    { field: 'password', type: VALIDATION_TYPES.PASSWORD, required: true },
    {
      field: 'confirmPassword',
      type: VALIDATION_TYPES.PASSWORD,
      required: true,
    },
    { field: 'token', type: VALIDATION_TYPES.STRING, required: true },
    { field: 'email', type: VALIDATION_TYPES.EMAIL, required: true },
  ];

  // Complex User Onboarding Schema
  static complexUserOnboardingSchema = [
    { field: 'fullName', type: VALIDATION_TYPES.PURE_NAME, required: true },
    { field: 'email', type: VALIDATION_TYPES.EMAIL, required: true },
    { field: 'password', type: VALIDATION_TYPES.PASSWORD, required: true },
    {
      field: 'hobbies',
      type: VALIDATION_TYPES.ARRAY,
      required: true,
      arrayType: VALIDATION_TYPES.STRING,
    },
    {
      field: 'address',
      type: VALIDATION_TYPES.OBJECT,
      required: true,
      schema: [
        { field: 'street', type: VALIDATION_TYPES.STRING, required: true },
        { field: 'city', type: VALIDATION_TYPES.STRING, required: true },
        { field: 'state', type: VALIDATION_TYPES.STRING, required: true },
        { field: 'country', type: VALIDATION_TYPES.STRING, required: true },
        { field: 'zipCode', type: VALIDATION_TYPES.STRING, required: true },
      ],
    },
    {
      field: 'phoneNumber',
      type: VALIDATION_TYPES.OBJECT,
      required: true,
      validate: (value) => {
        const isValid = validatePhoneNumber(value.phoneNumber);
        if (!isValid) {
          throw new CustomError('Invalid phone number', 400);
        }
        return isValid;
      },
    },
  ];

  // Permission Schema
  static permissionSchema = [
    { field: 'name', type: VALIDATION_TYPES.STRING, required: true },
    {
      field: 'slug',
      type: VALIDATION_TYPES.CUSTOM,
      required: true,
      validate: (value) => {
        // Eg: users:create
        const isValid = value.match(/^[a-z]+:(create|read|update|delete)(:[a-z]+)?$/);
        if (!isValid) {
          throw new CustomError('Invalid permission slug, Eg: users:create', 400);
        }
        return isValid;
      },
    },
    { field: 'description', type: VALIDATION_TYPES.STRING, required: false },
  ];

  // Assign Permissions Schema
  static assignPermissionsSchema = [
    { field: 'userId', type: VALIDATION_TYPES.INTEGER, required: true },
    {
      field: 'permissions',
      type: VALIDATION_TYPES.ARRAY,
      required: true,
      arrayType: VALIDATION_TYPES.INTEGER,
    },
  ];
}
