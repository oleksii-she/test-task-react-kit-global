import { Timestamp } from 'firebase/firestore';

import { ZodSchema } from 'zod';
export const parseDate = (str: string) => {
  const [datePart, timePart] = str.split(', ');
  const [day, month, year] = datePart.split('.');
  return new Date(`${year}-${month}-${day}T${timePart}`);
};

export const formatFireStoreTimestamp = (timestamp: unknown): string => {
  if (timestamp instanceof Timestamp) {
    const date = timestamp.toDate();
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  console.warn('Date is not a Timestamp object:', timestamp);
  return '';
};

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export function validateForm<T>(
  schema: ZodSchema<T>,
  data: T
): { isValid: boolean; errors: ValidationErrors<T> } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const formatted = result.error.format() as Record<string, { _errors?: string[] }>;
    const errors: ValidationErrors<T> = {};

    for (const key in formatted) {
      if (key !== '_errors' && formatted[key]?._errors?.[0]) {
        errors[key as keyof T] = formatted[key]!._errors![0];
      }
    }

    return { isValid: false, errors };
  }

  return { isValid: true, errors: {} };
}
