import useNetworkRequest from "../hooks/useNetworkRequest";
import FormWithSubmit from "../components/FormWithSubmit";
import { TextInput } from "../styles/StyledComponents";
import DatePicker from "./DatePicker";
import { useState } from "react";
import { SingleBpRecord } from "../models/bloodPressureModels";

interface IAddBpRecord {
  editMode: boolean;
  bpRecord: SingleBpRecord;
}

const AddBpRecordForm: React.FC<IAddBpRecord> = ({ editMode, bpRecord }) => {
  const { addBloodPressureRecord, updateBloodPressureRecords } =
    useNetworkRequest();
  const [date, setDate] = useState<Date>(bpRecord?.date || new Date());

  const addOrUpdateBloodPressure = editMode
    ? updateBloodPressureRecords
    : addBloodPressureRecord;

  return (
    <FormWithSubmit
      networkRequestFunction={addOrUpdateBloodPressure}
      msgSubject="Add BP Record"
      customFormFields={
        editMode
          ? [
              { name: "id", value: bpRecord?._id },
              { name: "date", value: new Date(date) },
            ]
          : [{ name: "date", value: new Date(date) }]
      }
      validation={["systolic", "diastolic", "pulse"]}
    >
      <h1>{editMode ? "Update" : "Add"} Blood Pressure Record</h1>
      <DatePicker setDate={setDate} date={date} />
      <TextInput
        name="systolic"
        id="outlined-error-helper-text"
        label="Systolic"
        defaultValue={bpRecord?.systolic}
      />
      <TextInput
        name="diastolic"
        id="outlined-error-helper-text"
        label="Diastolic"
        defaultValue={bpRecord?.diastolic}
      />
      <TextInput
        name="pulse"
        id="outlined-error-helper-text"
        label="Pulse"
        defaultValue={bpRecord?.pulse}
      />
    </FormWithSubmit>
  );
};

export default AddBpRecordForm;
