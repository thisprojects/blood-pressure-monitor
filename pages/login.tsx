import Navbar from "../components/Navigation";
import useNetworkRequest from "../hooks/useNetworkRequest";
import FormWithSubmit from "../components/FormWithSubmit";
import { TextInput } from "../styles/StyledComponents";
import Router from "next/router";
import useIsAuthenticated from "../hooks/useIsAuthenticated";

const Login = () => {
  const { login } = useNetworkRequest();
  const { isAuthenticated } = useIsAuthenticated();

  if (isAuthenticated) {
    Router.push("/");
  }

  return (
    <>
      <Navbar />
      <FormWithSubmit
        networkRequestFunction={login}
        msgSubject="Login"
        validation={["email", "password"]}
      >
        <h1 data-testid="login-form">Login</h1>
        <TextInput
          name="email"
          inputProps={{ "data-testid": "email" }}
          id="outlined-error-helper-text"
          label="Email"
        />
        <TextInput
          name="password"
          inputProps={{ "data-testid": "password" }}
          id="outlined-error-helper-text"
          label="Password"
        />
      </FormWithSubmit>
    </>
  );
};

export default Login;
