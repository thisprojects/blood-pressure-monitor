import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./index";

// const server = setupServer(
//   rest.get(
//     "http://localhost:8080/api/v1/analysis/getAnalysis",
//     (req, res, ctx) => {
//       // respond using a mocked JSON body
//       return res(ctx.json(dashboard));
//     }
//   )
// );

// beforeAll(() => server.listen());
// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => server.resetHandlers());
// // clean up once the tests are done
// afterAll(() => server.close());

test("Loads homepage - user not logged in", async () => {
  render(<App />);
  const pleaseLogIn = await screen.findByTestId("please-log-in");
  expect(pleaseLogIn.textContent).toEqual("Please Log-in or Register");
});
describe("Render Navigation", () => {
  test("Display Home", async () => {
    render(<App />);
    const home = await screen.findByTestId("home");
    expect(home.textContent).toEqual("Home");
  });

  test("Display Login", async () => {
    render(<App />);
    const login = await screen.findByTestId("login");
    expect(login.textContent).toEqual("Login");
  });

  test("Display Register", async () => {
    render(<App />);
    const register = await screen.findByTestId("register");
    expect(register.textContent).toEqual("Register");
  });
});
