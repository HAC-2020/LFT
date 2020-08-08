import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"A project by "}
      <Link color="inherit" href="https://github.com/HAC-2020/LFT">
        Team LFT
      </Link>
      {"."}
    </Typography>
  );
}
