import { Card, CardContent, Stack, Grid } from "@mui/material";
import useDeviceStore from '../store/deviceStore.js'
import DeviceState from "./DeviceState.jsx";
import { useEffect } from "react";
import container from "../container/container.js";

const DeviceStatuses = () => {
  const dataManager = container.resolve('dataManager')
  const valves = useDeviceStore((state) => state.valves || [])
  const pump = useDeviceStore((state) => state.pump)

  useEffect(() => {
    const fetchData = async () => {
      await dataManager.refreshPump()
      await dataManager.refreshValves()
    }
    fetchData()
  }, [])

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} direction='row'>
          <Grid container spacing={2}>
            {valves?.map((valve) => (
                <DeviceState key={valve.id} device={valve} />
            ))}
          </Grid>
          <DeviceState device={pump}/>
        </Stack>        
      </CardContent>
    </Card>
  );
};

export default DeviceStatuses;
