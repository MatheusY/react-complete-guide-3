import classes from "./Checkout.module.css";
import useValidate from "../../hooks/use-validate";

const validatePostal = (postal) =>
  postal.trim() !== "" && /^[0-9]*$/.test(String(postal));

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    isValid: inputNameValid,
    showMessage: showNameError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
  } = useValidate((name) => name.trim() !== "");

  const {
    enteredValue: enteredStreet,
    isValid: inputStreetValid,
    showMessage: showStreetError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
  } = useValidate((street) => street.trim() !== "");

  const {
    enteredValue: enteredPostal,
    isValid: inputPostalValid,
    showMessage: showPostalError,
    valueChangeHandler: postalChangeHandler,
    valueBlurHandler: postalBlurHandler,
  } = useValidate(validatePostal);

  const {
    enteredValue: enteredCity,
    isValid: inputCityValid,
    showMessage: showCityError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
  } = useValidate((city) => city.trim() !== "");

  const formIsValid =
    inputNameValid && inputStreetValid && inputPostalValid && inputCityValid;

  const confirmHandler = (event) => {
    event.preventDefault();
    nameBlurHandler();
    streetBlurHandler();
    postalBlurHandler();
    cityBlurHandler();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity,
    });
  };

  const inputNameClass = showNameError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inputStreetClass = showStreetError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inputPostalClass = showPostalError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  const inputCityClass = showCityError
    ? `${classes.control} ${classes.invalid}`
    : classes.control;

  return (
    <form onSubmit={confirmHandler}>
      <div className={inputNameClass}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
      </div>
      <div className={inputStreetClass}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
      </div>
      <div className={inputPostalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredPostal}
          onChange={postalChangeHandler}
          onBlur={postalBlurHandler}
        />
      </div>
      <div className={inputCityClass}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
