import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useMutation, useQuery, gql, ApolloError } from "@apollo/client";
import { useCookies } from "react-cookie";

const WHOAMI = gql`
  query Me {
    authEntry {
      ... on GQLAuthError {
        code
        message
      }
      ... on MyAuthorizedQueries {
        me {
          archived
          dateJoined
          email
          firstName
          isActive
          id
          isStaff
          isSuperuser
          lastName
          lastLogin
          logentrySet {
            pk
          }
          status {
            archived
            verified
          }
          username
          verified
        }
      }
    }
  }
`;

const AUTHENTICATE = gql`
  mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      token {
        payload {
          origIat
          exp
        }
        token
      }
      user {
        isActive
        username
        email
        status {
          verified
        }
      }
    }
  }
`;

export interface UserType {
  logentrySet: { pk: string }[];
  isSuperuser: boolean;
  lastLogin?: Date;
  isStaff: boolean;
  isActive: boolean;
  dateJoined: Date;
  status: { verified: boolean; archived: boolean };
  lastName?: string;
  id: string;
  email: string;
  firstName?: string;
  username: string;
  archived: boolean;
  verified: boolean;
}

type AuthError = ApolloError | { code: string; message: string }[];

interface AuthContextType {
  authResult: any;
  user: UserType | null;
  authenticating: boolean;
  error: AuthError | null;
  init: boolean;
  signin: (username: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserType | null>(null);
  const [error, setError] = React.useState<AuthError | null>(null);
  const [authenticate, { data, loading, error: apError }] =
    useMutation(AUTHENTICATE);
  const { data: tokenCheck, loading: tokenLoading } = useQuery(WHOAMI);
  const [init, setInit] = React.useState(false);

  const [, setCookie] = useCookies(["token"]);

  React.useEffect(() => {
    if (!tokenLoading && tokenCheck?.authEntry?.me) {
      setUser(tokenCheck.authEntry.me);
      setError(null);
    }
    if (!tokenLoading) setInit(true);
  }, [tokenCheck, tokenLoading]);

  const signin = (
    username: string,
    password: string,
    callback: VoidFunction
  ) => {
    authenticate({
      variables: { username, password },
      onCompleted: (result) => {
        if (result.tokenAuth) {
          if (result.tokenAuth.errors) {
            setError(result.tokenAuth.errors.nonFieldErrors);
            return;
          }
          if (!result.tokenAuth.success) {
            setUser(null);
            setCookie("token", null);
            setError([{ code: "unknown", message: "Unknown error" }]);
            return;
          } else {
            setCookie("token", result.tokenAuth.token.token);
            setUser(result.tokenAuth.user);
            setError(null);
            setTimeout(callback, 0);
          }
        }
      },
    });
  };

  const signout = (callback: VoidFunction) => {
    setUser(null);
    setCookie("token", null);
    setError(null);
    callback();
  };

  const value = {
    authResult: data,
    user,
    signin,
    signout,
    init,
    authenticating: loading || tokenLoading,
    error: apError || error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.init) return <></>;

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
