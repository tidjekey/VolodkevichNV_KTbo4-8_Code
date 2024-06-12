import { useEffect, useState } from "react";
import { validateValue } from "../validation/validation";

export const useInput = (initialValue: any, validators: any[] = []) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const [error, setError] = useState<null | string>(null);


  const handleChange = (e: any) => {
    setValue(e.target.value);

    validateValue(e.target.value, validators).then((validationResult) => {
      setError(validationResult);
    });
  };

  return {
    value,
    onChange: handleChange,
    setDirty,
    isDirty,
    error,
    setValue
  };
};
