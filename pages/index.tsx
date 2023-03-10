import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Navbar from "../components/Navigation";
import AuthorisedContent from "../components/AuthorisedContent";
import DisplayBloodPressureRecords from "../components/DisplayBloodPressureRecords";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import { FlexColumnDiv, Header, Paragraph } from "../styles/StyledComponents";

const NotAuthed = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FlexColumnDiv>
            <Header>Blood Pressure Monitor</Header>
            <Paragraph>
              An app for recording diastolic and systolic blood pressure
              readings.
            </Paragraph>
            <ImportantDevicesIcon
              sx={{ fontSize: "500px" }}
              color="secondary"
            />
            <Header data-testid="please-log-in">
              Please Log-in or Register
            </Header>
          </FlexColumnDiv>
        </Grid>
      </Grid>
    </Box>
  );
};

const Homepage = () => {
  return (
    <>
      <Navbar />
      <AuthorisedContent NotAuthed={NotAuthed}>
        <DisplayBloodPressureRecords />
      </AuthorisedContent>
    </>
  );
};

export default Homepage;
