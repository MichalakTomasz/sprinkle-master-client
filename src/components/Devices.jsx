import { Grid } from "@mui/material"
import Device from "./Device"
import useDeviceStore from '../store/deviceStore'
import { useEffect } from 'react'
import container from "../container/container.js"

const Devices = () => {
  const dataManager = container.resolve("dataManager")
  const valves = useDeviceStore((state) => state.valves || [])

  useEffect(() => {
    const fetchData = async () => {
      await dataManager.refreshValves()
    }
    fetchData()
  }, [])

  return (
    <Grid container spacing={2}>
      {Array.isArray(valves) && valves.map((valve) => (
        <Grid key={valve.id}>
          <Device device={valve} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Devices;
