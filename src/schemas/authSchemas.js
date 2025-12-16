import * as yup from "yup"

export const registrationSchema = yup.object().shape({
    firstName: yup.string().required("Введите имя").min(2, "Минимум 2 символа").max(32, "Максимум 32 символа"),
    lastName: yup.string().required("Введите фамилию").min(2, "Минимум 2 символа").max(32, "Максимум 32 символа"),
    email: yup.string().email("Неверный email").required("Введите Email"),
    password: yup.string().required("Введите пароль").min(6, "Минимум 6 символов").max(32, "Максимум 32 символа"),
})