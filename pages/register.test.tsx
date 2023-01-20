import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Register from "./register";
import "whatwg-fetch";

const server = setupServer(
  rest.post("http://localhost:8080/api/post/register", (req: any, res, ctx) => {
    // respond using a mocked JSON body

    if (
      req._body.get("email") === "hello@hello.com" &&
      req._body.get("password") === "123456"
    ) {
      return res(ctx.status(200));
    }
    return res(ctx.status(500));
  })
);

beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

test("Load Registration Page", async () => {
  render(<Register />);
  const loginForm = await screen.findByTestId("registration-form");
  expect(loginForm.textContent).toEqual("Register an Account");
});
describe("Register Interaction", () => {
  test("Successful Register", async () => {
    render(<Register />);
    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const fname = await screen.findByTestId("fname");
    const lname = await screen.findByTestId("lname");

    fireEvent.change(email, { target: { value: "hello@hello.com" } });
    fireEvent.change(password, { target: { value: "123456" } });
    fireEvent.change(fname, { target: { value: "bob" } });
    fireEvent.change(lname, { target: { value: "testerberger" } });

    const submit = await screen.findByTestId("submit");
    await userEvent.click(submit);

    const successPopup = await screen.findByTestId("success");
    expect(successPopup).toBeInTheDocument();
  });
  test("Failed Register", async () => {
    render(<Register />);
    const email = await screen.findByTestId("email");
    const password = await screen.findByTestId("password");
    const fname = await screen.findByTestId("fname");
    const lname = await screen.findByTestId("lname");

    fireEvent.change(email, { target: { value: "hello@hello.com1" } });
    fireEvent.change(password, { target: { value: "1234561" } });
    fireEvent.change(fname, { target: { value: "bob" } });
    fireEvent.change(lname, { target: { value: "testerberger" } });

    const submit = await screen.findByTestId("submit");
    await userEvent.click(submit);

    const failPopup = await screen.findByTestId("fail");
    expect(failPopup).toBeInTheDocument();
  });
});
