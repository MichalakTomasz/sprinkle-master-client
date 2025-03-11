import { Stack } from "@mui/material";
import Device from "./Device.jsx";
import { devices } from "../setup/mock-data.js";

const Devices = () => {
  return (
    <Stack 
        direction="row" 
        spacing={2}
        sx={{
            flexWrap: "wrap",
            rowGap: 2
        }}>
      {devices.map((device) => (
        <Device key={device.id} device={device} />
      ))}
    </Stack>
  );
};

export default Devices;
