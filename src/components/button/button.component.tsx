import { FC, ButtonHTMLAttributes } from "react";

import { BUTTON_TYPE_CLASSES } from "../../utils/components/button.component";

import { BaseButton, GoogleSignButton, InvertedButton, ButtonSpinner } from "./button.styles";

const BUTTON_TYPE_MAP = {
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
};

type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, buttonType = BUTTON_TYPE_CLASSES.base, isLoading, ...otherProps }) => {

  const CustomButton = BUTTON_TYPE_MAP[buttonType] || BaseButton

  return (<CustomButton disabled={ isLoading} {...otherProps}>{isLoading ? <ButtonSpinner /> : children}</CustomButton>)
  
};

export default Button;