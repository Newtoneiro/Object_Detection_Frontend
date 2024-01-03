/**
 * @file AuthContext.utils.ts
 * @description AuthContext Utils.
 */

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * Validates the email based on the email regex.
 * @function validateEmail
 * @exports validateEmail
 * @param {string} email - The email to validate.
 * @returns {boolean} - The flag indicating if the email is valid.
 */
export const validateEmail = (email: string): boolean => {
  return String(email).toLowerCase().match(emailRegex) != null;
};
