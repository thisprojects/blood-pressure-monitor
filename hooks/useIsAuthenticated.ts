import { UserContext } from "../components/ContextWrapper";

function useIsAuthenticated() {
  const { userCredentials } = UserContext();
  const isAuthenticated =
    userCredentials?.userId.length === 24 && userCredentials?.token !== "";

  return { isAuthenticated };
}

export default useIsAuthenticated;
