import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total Signals</Title>
      <Typography component="p" variant="h4">
        3,024
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        as of{" "}
        {new Date().toLocaleDateString("en-ca", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>
    </React.Fragment>
  );
}
