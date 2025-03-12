import { Stack } from "@mui/material";
import Device from "./Device.jsx";
import { valves } from "../setup/mock-data.js";

const Devices = () => {
  return (
    <Stack 
        direction="row" 
        spacing={2}
        sx={{
            flexWrap: "wrap",
            rowGap: 2
        }}>
      {valves.map((device) => (
        <Device key={device.id} device={device} />
      ))}
    </Stack>
  );
};

export default Devices;
