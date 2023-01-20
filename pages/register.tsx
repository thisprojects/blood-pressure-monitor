import Navbar from "../components/Navigation";
import { TextInput } from "../styles/StyledComponents";
import useNetworkRequest from "../hooks/useNetworkRequest";
import FormWithSubmit from "../components/FormWithSubmit";

const Register = () => {
  const { register } = useNetworkRequest();

  return (
    <>
      <Navbar />
      <FormWithSubmit
        networkRequestFunction={register}
        msgSubject="Registration"
        validation={["lname", "fname", "email", "password"]}
      >
        <h1 data-testid="registration-form">Register an Account</h1>
        <TextInput
          name="fname"
          inputProps={{ "data-testid": "fname" }}
          id="outlined-error"
          label="First Name"
        />
        <TextInput
          name="lname"
          id="outlined-error-helper-text"
          label="Last Name"
          inputProps={{ "data-testid": "lname" }}
        />
        <TextInput
          name="email"
          id="outlined-error-helper-text"
          inputProps={{ "data-testid": "email" }}
          label="Email"
        />
        <TextInput
          name="password"
          id="outlined-error-helper-text"
          inputProps={{ "data-testid": "password" }}
          label="Password"
        />
      </FormWithSubmit>
    </>
  );
};

export default Register;
