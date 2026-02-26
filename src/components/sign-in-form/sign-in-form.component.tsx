import { useState, SubmitEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { BUTTON_TYPE_CLASSES } from "../../utils/components/button.component";


import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles";

const defaultFormFields = {
  email: '',
  password: '',

}



const SignInForm  = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value})

  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

    const signInWithGoogle = async () => {
      dispatch(googleSignInStart());
    }
  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart( email, password ));

      resetFormFields();
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={ handleSubmit }>

        <FormInput label="Email" required onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}

export default SignInForm; 