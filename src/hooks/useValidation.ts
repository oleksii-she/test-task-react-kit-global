import { useState } from "react";
import { ZodSchema } from "zod";

export function useValidation<T>(schema: ZodSchema<T>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = (data: T): boolean => {
    const result = schema.safeParse(data);

    if (!result.success) {
      const formatted = result.error.format() as Record<
        string,
        { _errors?: string[] }
      >;
      const newErrors: Partial<Record<keyof T, string>> = {};

      for (const key in formatted) {
        if (key !== "_errors" && formatted[key]?._errors?.[0]) {
          newErrors[key as keyof T] = formatted[key]!._errors![0];
        }
      }

      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  return { errors, validate };
}
