import { BaseButton, GoogleSignButton, InvertedButton, ButtonSpinner } from "./button.styles";
import { BUTTON_TYPE_CLASSES } from "../../utils/components/button.component";

const BUTTON_TYPE_MAP = {
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
};

const Button = ({ children, buttonType = BUTTON_TYPE_CLASSES.base, isLoading, ...otherProps }) => {

  const CustomButton = BUTTON_TYPE_MAP[buttonType] || BaseButton

  return (<CustomButton disabled={ isLoading} {...otherProps}>{isLoading ? <ButtonSpinner /> : children}</CustomButton>)
  
};

export default Button;