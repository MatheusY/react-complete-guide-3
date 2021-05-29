import { useState } from "react";

const useValidate = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(enteredValue);
  const showMessage = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  return {
    enteredValue,
    isValid,
    showMessage,
    valueChangeHandler,
    valueBlurHandler,
  };
};

export default useValidate;
