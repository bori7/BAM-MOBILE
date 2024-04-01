/**
 * Function for validate input object based on a validation scheme
 * @param {Object} validateObj - Object with input properties for validation
 * @param {Object<Function>} validateScheme - Validation scheme
 */
// @ts-ignore
export const validateObject = (
  validateObj: { [key: string]: unknown } = {},
  validateScheme: { [key: string]: (value: unknown) => boolean } = {},
): {
  data: Record<keyof typeof validateScheme, { isValid: boolean }>;
  isValid: boolean;
} => {
  return Object.entries(validateObj).reduce(
    (result, [key, value]) => {
      const isValid = validateScheme[key](value);
      // @ts-ignore
      result.isValid = Boolean(result.isValid * isValid); // Discrete multiplication
      result.data = {
        ...result.data,
        [key]: { value, isValid },
      };
      return result;
    },
    { isValid: true, data: {} },
  );
};
