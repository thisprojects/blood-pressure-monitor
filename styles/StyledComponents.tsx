import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";

export const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.secondary.main,
}));

export const PlusIcon = styled(MapsUgcIcon)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const FlexColumnDiv = styled("div")(({ theme }) => ({
  "& .MuiTextField-root": { m: 1, width: "25ch" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  justifyContent: "center",
}));

export const DrawerToggle = styled("div")(({ theme }) => ({
  padding: "10px",
  margin: "10px",
  display: "flex",
  justifyContent: "flex-end",
  flexDirection: "row",
  minWidth: "none!important",
  color: theme.palette.text.secondary,
}));

export const BpCardButton = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  margin: "10px",
}));

export const Header = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  fontSize: "34px",
}));

export const GridRow = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const FormWrapper = styled(Box)(({ theme }) => ({
  "& .MuiTextField-root": { m: 1, width: "25ch" },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: theme.spacing(2),
  padding: theme.spacing(2),
  justifyContent: "center",
}));

export const Error = styled("p")(({ theme }) => ({
  color: "red",
}));

export const SubmitButton = styled("input")(({ theme }) => ({
  margin: theme.spacing(2),
  width: "160px",
  height: "50px",
  fontSize: "24px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  borderRadius: "5px",
  border: `1px solid lightgray`,
  cursor: "pointer",
}));

export const TextInput = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1),
}));
