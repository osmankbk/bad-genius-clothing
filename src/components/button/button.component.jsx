import { BaseButton, GoogleSignButton, InvertedButton } from "./button.styles";
import { BUTTON_TYPE_CLASSES } from "./button-type-class";

const BUTTON_TYPE_MAP = {
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
};

const Button = ({ children, buttonType = BUTTON_TYPE_CLASSES.base, ...otherProps }) => {

  const CustomButton = BUTTON_TYPE_MAP[buttonType] || BaseButton

  return (<CustomButton {...otherProps}>{children}</CustomButton>)
  
};

export default Button;