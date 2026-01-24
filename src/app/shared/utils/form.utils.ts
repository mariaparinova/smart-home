import { AbstractControl } from '@angular/forms';

export function getErrorMessage(
  control: AbstractControl,
  messages: Record<string, string>,
): string | null {
  if (!control.errors) {
    return null;
  }

  const errorKeys = Object.keys(control.errors);

  for (const key of errorKeys) {
    if (messages[key]) {
      return messages[key];
    }
  }
  return null;
}
