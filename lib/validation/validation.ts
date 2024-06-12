export type ValidationResult = string | null;
export type Validator<T> = (params: T) => Promise<ValidationResult>;
export type GetValidator<Options, Params> = (
  options?: Options
) => Validator<Params>;

export const validateValue = async <T>(
  value: T,
  validators: Validator<T>[]
): Promise<ValidationResult> => {
  let validationResult: ValidationResult = null;
  let i = 0;

  while (validationResult === null && i < validators.length) {
    //@ts-ignore
    const res = await (await validators[i]())(value);

    res && (validationResult = res);
    i++;
  }

  return validationResult;
};
