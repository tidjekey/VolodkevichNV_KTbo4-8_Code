import type { GetValidator } from "./validation";

export const required: GetValidator<string, string> = (
  message = "Обязательное поле"
) => {
  return async (value) => (value ? null : message);
};

export const validEmail: GetValidator<string, string> = (
  message = "Неверный email"
) => {
  return async (value) =>
    value.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
      ? null
      : message;
};

export const validPhone: GetValidator<string, string> = (
  message = "Неверный email"
) => {
  return async (value) =>
    value.match(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    )
      ? null
      : message;
};
