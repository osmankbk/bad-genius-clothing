
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { AunthenticationContainer } from "./authentication.styles";

const Authentication = () => {


  return (
    <AunthenticationContainer>
        <SignInForm />
        <SignUpForm />
    </AunthenticationContainer>
  );
}

export default Authentication;