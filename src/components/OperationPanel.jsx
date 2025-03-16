import { Card, Button, Switch, Typography, Box, Stack } from "@mui/material";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import { useEffect } from "react";
import container from "../container/container";
import useDeviceStore from "../store/deviceStore.js";

const OperationPanel = () => {
  const dataManager = container.resolve('dataManager')
  const isSchedulerEnabled = useDeviceStore(state => state.isSchedulerEnabled)
  
  useEffect(() => {
    const fetchIsSchedulerEnabled = async() => {
      await dataManager.refreshIsSchedulerEnabled()
    }
    
    fetchIsSchedulerEnabled()
    
  }, [])

  const onCloseAllClick = () => {
     dataManager.closeAll()
  }

  const onSchedulerEnableChange = async () => {
    if (isSchedulerEnabled){
      dataManager.stopScheduler()
    } else {
      await dataManager.runScheduler()
    }
    
    await dataManager.refreshIsSchedulerEnabled()
  };

  return (
    <Card sx={{ p: 2 }} >
      <Stack direction="row" spacing={2} >
        <Box>
          <Switch
            checked={isSchedulerEnabled}
            onChange={onSchedulerEnableChange}
          />
          <Typography>Scheduler</Typography>
        </Box>
        <Button onClick={onCloseAllClick} variant="outlined" startIcon={<FlashOffIcon />} sx={{ m: 2 }}>
          Close all
        </Button>
      </Stack>
    </Card>
  );
};

export default OperationPanel;
