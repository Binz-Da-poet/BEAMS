import { z } from 'zod';

export const CommonFormSchema = z
  .object({
    item: z.string().min(1, 'アイテムは必須です'),
    plan: z.string().min(1, 'プランは必須です'),
    staffName: z.string().min(1, '担当者は必須です'),
    fabricCode: z.string().min(1, '生地品番は必須です'),
    receivedDate: z.string().min(1, '受付日は必須です'),
    arrivalDate: z.string().min(1, '店舗到着予定日は必須です'),
  })
  .partial({ note: true });

export type CommonForm = z.infer<typeof CommonFormSchema>;

export const useValidation = () => {
  const validate = (data: Record<string, string>) => {
    const result = CommonFormSchema.safeParse(data);
    return {
      valid: result.success,
      errors: result.success ? {} : result.error.flatten().fieldErrors,
    };
  };

  return { validate };
};
