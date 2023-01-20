import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { StyledLink } from "../styles/StyledComponents";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <StyledLink data-testid="home" href="/">
              Home
            </StyledLink>
          </Typography>
          <Button data-testid="login" color="inherit">
            <StyledLink href="/login">Login</StyledLink>
          </Button>
          <Button color="inherit">
            <StyledLink data-testid="register" href="/register">
              Register
            </StyledLink>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
