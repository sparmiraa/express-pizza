import * as yup from "yup";

export const updateUserSchema = yup.object({
  firstName: yup
    .string()
    .required("Введите имя")
    .min(2, "Минимум 2 символа")
    .max(32, "Максимум 32 символа"),
  lastName: yup
    .string()
    .required("Введите фамилию")
    .min(2, "Минимум 2 символа")
    .max(32, "Максимум 32 символа"),
});
