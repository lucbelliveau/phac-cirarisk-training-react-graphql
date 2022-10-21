import * as React from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import { gql, useMutation } from "@apollo/client";

const SENDPASSRESETEMAIL = gql`
  mutation SendPassResetEmail($email: String!) {
    sendPasswordResetEmail(email: $email) {
      errors
      success
    }
  }
`;

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [sendEmail, { data, loading, error }] = useMutation(SENDPASSRESETEMAIL);

  const handleClickOpen: React.MouseEventHandler<HTMLAnchorElement> = (
    event
  ) => {
    event.preventDefault();
    setOpen(true);
    return false;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const email = formdata.get("email");
    sendEmail({ variables: { email } });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link href="#" variant="body2" onClick={handleClickOpen}>
        Forgot password?
      </Link>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Forgot password</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Please enter your email address to reset your password.
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              autoComplete="email"
              disabled={loading}
            />
            {data?.sendPasswordResetEmail?.success && (
              <Alert severity="success">
                If the specified email exists an email will be sent.
              </Alert>
            )}
            {error && <Alert severity="error">{error.message}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button disabled={loading} onClick={handleClose}>
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Reset Password
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
