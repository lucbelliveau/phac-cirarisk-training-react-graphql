import React from "react";
import ReactDOM from "react-dom/client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { CookiesProvider, useCookies } from "react-cookie";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Main from "./Main";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { AuthProvider, RequireAuth } from "./Auth";

function AuthenticatedApolloProvider({ children }: { children: JSX.Element }) {
  const [cookies] = useCookies(["token"]);
  const httpLink = createHttpLink({
    uri: "http://localhost:8000/en-ca/graphql",
  });

  const authLink = React.useMemo(
    () =>
      setContext((_, { headers }) => {
        const token = cookies["token"];
        return {
          headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : "",
          },
        };
      }),

    [cookies]
  );

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

const router = createBrowserRouter([
  {
    element: <Main />,
    errorElement: <div>Error 404: You are lost.</div>,
    children: [
      {
        path: "/",
        element: (
          <RequireAuth>
            <App />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthenticatedApolloProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </AuthenticatedApolloProvider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
