import { Card, Button, Switch, Typography, Box, Stack } from "@mui/material";
import FlashOffIcon from "@mui/icons-material/FlashOff";
import { useEffect } from "react";
import container from "../container/container";
import useDeviceStore from "../store/deviceStore.js";

const OperationPanel = () => {
  const dataManager = container.resolve('dataManager')
  const isSchedulerEnabled = useDeviceStore(state => state.isSchedulerEnabled)
  const useWeatherAssistant = useDeviceStore(state => state.useWeatherAssistant)
  
  useEffect(() => {
    const fetchStates = async() => {
      await dataManager.refreshIsSchedulerEnabled()
      await dataManager.refreshUseWeatherAssistant()
    }
    
    fetchStates()
    
  }, [])

  const onCloseAllClick = () => {
     dataManager.closeAll()
  }

  const onSchedulerEnableChange = async () => {
    if (isSchedulerEnabled){
      await dataManager.stopScheduler()
    } else {
      await dataManager.runScheduler()
    }
    
    await dataManager.refreshIsSchedulerEnabled()
  };

  const onUseWeatherAssistantChange = async () => {
    if (useWeatherAssistant){
      await dataManager.setUseWeatherAssistant(false)
    } else {
      await dataManager.setUseWeatherAssistant(true)
    }
    await dataManager.refreshUseWeatherAssistant()
  }

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
        <Box>
          <Switch
            checked={useWeatherAssistant}
            onChange={onUseWeatherAssistantChange}
          />
          <Typography>Weather assistant</Typography>
        </Box>
        <Button onClick={onCloseAllClick} variant="outlined" startIcon={<FlashOffIcon />} sx={{ m: 2 }}>
          Close all
        </Button>
      </Stack>
    </Card>
  );
};

export default OperationPanel;
