import { Card, CardContent, Stack, Typography } from "@mui/material";
import CircleIndicator from "./CircleIndicator";
import PinState from "../models/PinState";
import container from "../container/container.js";
import { useEffect, useState } from "react";
import useDeviceStore from '../store/deviceStore'

const DeviceStatus = () => {
  const dataManager = container.resolve('dataManager')
  const valves = useDeviceStore((state) => state.valves)
  const pump = useDeviceStore((state) => state.pump)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const valvesResult = await dataManager.getValves()
        const pumpResult = await dataManager.getPump()
        console.log('Loaded valves:', valvesResult)
        console.log('Current store state:', useDeviceStore.getState())
      } catch (error) {
        console.error('Error loading devices:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    getData()
  }, [])

  if (isLoading) {
    return <Typography>Loading devices...</Typography>
  }

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} direction='row'>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography>Pump:</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography>State:</Typography>
              <CircleIndicator isActive={pump?.state == PinState.HIGH} />
            </Stack>
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography>Valves:</Typography>
            {valves?.map((valve) => (
              <Stack key={valve.id} direction={"row"}>
                <Typography>{valve.name}: </Typography>
                <CircleIndicator isActive={valve.state == PinState.HIGH} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default DeviceStatus;
