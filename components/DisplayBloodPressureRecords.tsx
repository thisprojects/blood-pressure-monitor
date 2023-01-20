import AuthorisedContent from "./AuthorisedContent";
import { UserContext } from "./ContextWrapper";
import BPStats from "./BpStats";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import BPCards from "./BPCards";
import useNetworkRequest from "../hooks/useNetworkRequest";
import AddBpRecordForm from "./AddBpRecordForm";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import {
  FlexColumnDiv,
  DrawerToggle,
  Header,
  PlusIcon,
} from "../styles/StyledComponents";
import { SingleBpRecord } from "../models/bloodPressureModels";

const DisplayBloodPressureRecords = () => {
  const { getBloodPressureRecords, deleteBloodPressureRecord } =
    useNetworkRequest();

  const { userCredentials } = UserContext();
  const { userDetails, bloodPressureRecords } = userCredentials;

  const [bPRecordToEdit, setBpRecordToEdit] = useState<SingleBpRecord>(
    {} as SingleBpRecord
  );

  const [drawerState, setDrawerState] = useState({
    open: false,
    editMode: false,
  });

  const handleDeleteRecord = (id: string) => {
    deleteBloodPressureRecord(id);
  };

  const handleDrawerClose = () => {
    setDrawerState({ open: false, editMode: false });
    setBpRecordToEdit({} as SingleBpRecord);
  };

  const handleDrawerOpen = () => {
    setDrawerState({ open: true, editMode: false });
  };

  const handleEditMode = (id: string) => {
    const bpRecord = bloodPressureRecords.find(
      (item: SingleBpRecord) => item._id === id
    );
    setBpRecordToEdit(bpRecord as SingleBpRecord);
    setDrawerState({ open: true, editMode: true });
  };

  useEffect(() => {
    const setBP = async () => {
      await getBloodPressureRecords();
    };
    setBP();
  }, []);

  return (
    <>
      <AuthorisedContent>
        <Drawer
          anchor="right"
          open={drawerState.open}
          onClose={handleDrawerClose}
        >
          <AddBpRecordForm
            editMode={drawerState.editMode}
            bpRecord={bPRecordToEdit}
          />
        </Drawer>
        <FlexColumnDiv>
          <Grid container spacing={2}>
            <Grid item xs={11}>
              <Header data-testid="welcome">
                Welcome {userDetails?.fname}
              </Header>
            </Grid>
            <Grid item xs={1}>
              <DrawerToggle>
                <Button
                  variant="contained"
                  onClick={handleDrawerOpen}
                  startIcon={<PlusIcon />}
                  sx={{ minWidth: "auto" }}
                >
                  Add
                </Button>
              </DrawerToggle>
            </Grid>
            <BPCards
              bloodPressureRecords={bloodPressureRecords}
              handleDeleteRecord={handleDeleteRecord}
              handleEditMode={handleEditMode}
            />
            <BPStats bloodPressureRecords={bloodPressureRecords} />
          </Grid>
        </FlexColumnDiv>
      </AuthorisedContent>
    </>
  );
};

export default DisplayBloodPressureRecords;
