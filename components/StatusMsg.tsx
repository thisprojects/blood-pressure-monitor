import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IStatusMSG {
  success: boolean;
  error: boolean;
  subject: string;
}

const StatusMSG: React.FC<IStatusMSG> = ({ success, error, subject }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(true);
  }, [success, error]);

  if (success) {
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          data-testid="success"
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {subject} was successful!
        </Alert>
      </Snackbar>
    );
  }

  if (error) {
    return (
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          data-testid="fail"
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {subject} was un-succesful.
        </Alert>
      </Snackbar>
    );
  }

  return null;
};

export default StatusMSG;
