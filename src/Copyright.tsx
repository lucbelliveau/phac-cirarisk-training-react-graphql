import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import logo from "./logo.svg";

export default function Copyright(props: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        target="_blank"
        color="inherit"
        href="https://media2.giphy.com/media/OaLGhdKu5LURO/giphy.gif?cid=ecf05e47riabdrqmqrdrongg76zcm2ks9n9kx74kcudrg9xd&rid=giphy.gif&ct=g"
      >
        Luc's Beard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
    <img src={logo} alt="A beard" width={40} />
    </div>
  );
}