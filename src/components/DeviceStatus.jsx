import { Card, CardContent, Stack, Box } from "@mui/material";
import DeviceState from "./DeviceState";
import useDeviceStore from "../store/deviceStore";
import { useEffect } from "react";
import container from "../container/container.js";

const DeviceStatus = () => {
  const dataManager = container.resolve("dataManager");
  const valves = useDeviceStore((state) => state.valves || []);
  const pump = useDeviceStore((state) => state.pump);

  useEffect(() => {
    const fetchData = async () => {
      await dataManager.refreshValves();
      await dataManager.refreshPump();
    };
    fetchData();
  }, []);

  return (
    <Card>
      <CardContent>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="flex-start"
        >
          <Box flex={1}>
            <Stack spacing={2} direction="row" flexWrap="wrap" gap={2}>
              {valves?.map((valve) => (
                <DeviceState key={valve.id} device={valve} />
              ))}
            </Stack>
          </Box>
          <Box>
            <DeviceState device={pump}/>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DeviceStatus;