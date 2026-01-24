export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  lowercaseLettersOnly: 'Only lowercase letters are allowed',
  mustHasLetterOnly: 'Allowed characters: A-Z, a-z',
  getMinLengthErrorMessage: (minLength: number) => `Must contain at least ${minLength} characters`,
  getMaxLengthErrorMessage: (maxLength: number) => `Must contain at most ${maxLength} characters`,
  mustBeUnique: 'Must be unique',
};
