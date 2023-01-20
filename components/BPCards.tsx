import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { GridRow, BpCardButton } from "../styles/StyledComponents";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { SingleBpRecord } from "../models/bloodPressureModels";

interface IBPCards {
  bloodPressureRecords: Array<SingleBpRecord>;
  handleDeleteRecord: (id: string) => void;
  handleEditMode: (id: string) => void;
}

const BPCards: React.FC<IBPCards> = ({
  bloodPressureRecords,
  handleDeleteRecord,
  handleEditMode,
}) => {
  return (
    <>
      {" "}
      <h4>Blood Pressure Records</h4>
      <Grid
        sx={{
          border: "solid 1px lightgray",
          borderRadius: "10px",
          justifyContent: "center",
          margin: "5px",
        }}
        item
        xs={12}
        direction="row"
        container
      >
        {bloodPressureRecords &&
          bloodPressureRecords.map((item: SingleBpRecord) => (
            <GridRow id={item._id} key={item._id}>
              <Card
                sx={{
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Typography variant="h5" component="div" sx={{ mb: 1.5 }}>
                  Date: {new Date(item.date).toLocaleDateString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Time: {new Date(item.date).toLocaleTimeString()}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  DIA: {item.diastolic}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  SYS: {item.systolic}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  PULSE: {item.pulse}
                </Typography>
                <BpCardButton
                  onClick={() => {
                    handleDeleteRecord(item._id);
                  }}
                >
                  <DeleteIcon />
                </BpCardButton>
                <BpCardButton
                  onClick={() => {
                    handleEditMode(item._id);
                  }}
                >
                  <EditIcon />
                </BpCardButton>
              </Card>
            </GridRow>
          ))}
      </Grid>
    </>
  );
};

export default BPCards;
