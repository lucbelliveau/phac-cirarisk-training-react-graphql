import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { gql, useMutation } from "@apollo/client";

import Copyright from "./Copyright";

const REGISTER = gql`
  mutation Register(
    $email: String!
    $password1: String!
    $password2: String!
    $username: String!
  ) {
    register(
      email: $email
      password1: $password1
      password2: $password2
      username: $username
    ) {
      errors
      success
    }
  }
`;

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [register, { data, loading, error }] = useMutation(REGISTER);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const username = data.get("username");
    const password1 = data.get("password1");
    const password2 = data.get("password2");
    register({
      variables: { email, username, password1, password2 },
    });
  };

  const handleSignIn: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {data?.register?.success && (
            <Box sx={{ mt: 3 }}>
              <Alert severity="success">
                Your account has been created successfully.
              </Alert>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleSignIn}>
                    Proceed to login
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
          {!data?.register?.success && (
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    disabled={loading}
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    error={Boolean(data?.register?.errors?.username)}
                    helperText={data?.register?.errors?.username
                      ?.map((e: { message: string; code: string }) => e.message)
                      .join(", ")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={loading}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    error={Boolean(data?.register?.errors?.email)}
                    helperText={data?.register?.errors?.email
                      ?.map((e: { message: string; code: string }) => e.message)
                      .join(", ")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={loading}
                    required
                    fullWidth
                    name="password1"
                    label="Password"
                    type="password"
                    id="password1"
                    autoComplete="new-password"
                    error={Boolean(data?.register?.errors?.password1)}
                    helperText={data?.register?.errors?.password1
                      ?.map((e: { message: string; code: string }) => e.message)
                      .join(", ")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={loading}
                    required
                    fullWidth
                    name="password2"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    autoComplete="confirm-password"
                    error={Boolean(data?.register?.errors?.password2)}
                    helperText={data?.register?.errors?.password2
                      ?.map((e: { message: string; code: string }) => e.message)
                      .join(", ")}
                  />
                </Grid>
              </Grid>
              {(data?.register?.errors?.nonFieldErrors || error) && (
                <Box paddingTop={1}>
                  <Alert severity="error">
                    {error?.message ||
                      data.register.errors.nonFieldErrors
                        .map(
                          (e: { message: string; code: string }) => e.message
                        )
                        .join(", ")}
                  </Alert>
                </Box>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleSignIn}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
