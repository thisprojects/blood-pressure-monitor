import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Grid from "@mui/material/Grid";
import { SingleBpRecord } from "../models/bloodPressureModels";

interface IBPStats {
  bloodPressureRecords: Array<SingleBpRecord>;
}

const BPStats: React.FC<IBPStats> = ({ bloodPressureRecords }) => {
  const diastolicBloodPressure = bloodPressureRecords?.map(
    (item: SingleBpRecord) => {
      return [
        Date.parse(item.date as unknown as string),
        Number(item.diastolic),
      ];
    }
  );

  const systolicBloodPressure = bloodPressureRecords?.map(
    (item: SingleBpRecord) => {
      return [
        Date.parse(item.date as unknown as string),
        Number(item.systolic),
      ];
    }
  );

  diastolicBloodPressure?.sort((a: number[], b: number[]) => {
    return a[0] - b[0];
  });

  systolicBloodPressure?.sort((a: number[], b: number[]) => {
    return a[0] - b[0];
  });
  return (
    <>
      <h4>Blood Pressure Statistics</h4>
      <Grid
        sx={{
          border: "solid 1px lightgray",
          borderRadius: "10px",
          justifyContent: "center",
          margin: "5px",
          width: "100%",
        }}
        item
        xs={12}
        direction="row"
        container
      >
        <div
          style={{
            display: "block",
            width: "100%",
          }}
        >
          {bloodPressureRecords && (
            <HighchartsReact
              highcharts={Highcharts}
              options={{
                accessibility: {
                  enabled: false,
                },
                chart: {
                  type: "line",
                },
                xAxis: {
                  type: "datetime",
                },
                yAxis: {
                  title: {
                    text: "Values",
                  },
                },
                title: {
                  text: "Bp Spline",
                },
                series: [
                  {
                    type: "spline",
                    name: "Diastolic",
                    data: diastolicBloodPressure,
                  },
                  {
                    type: "spline",
                    name: "Systolic",
                    data: systolicBloodPressure,
                  },
                ],
              }}
            />
          )}
        </div>
      </Grid>
    </>
  );
};

export default BPStats;
