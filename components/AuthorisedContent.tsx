import { ReactNode } from "react";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import { FlexColumnDiv } from "../styles/StyledComponents";

const AuthorisedContent = ({
  children,
  NotAuthed,
}: {
  children: ReactNode;
  NotAuthed?: () => JSX.Element;
}) => {
  const { isAuthenticated } = useIsAuthenticated();

  return (
    <>
      {(isAuthenticated && children) || (NotAuthed && NotAuthed()) || (
        <FlexColumnDiv>
          <h1>Please Log In</h1>{" "}
          <p>If you dont have an account you can register *HERE*</p>
        </FlexColumnDiv>
      )}
    </>
  );
};

export default AuthorisedContent;
