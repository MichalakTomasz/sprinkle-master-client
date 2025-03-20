import {
  CardContent,
  CardActions,
  Switch,
  Typography,
  Card,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import DeviceDialog from "./DeviceDialog";
import container from "../container/container.js";
import convertPinState from "../helpers/convertPinState.js";
import useDeviceStore from '../store/deviceStore'
import MessageDialog from './MessageDialog'

const Device = ({ device }) => {
  const dataManager = container.resolve("dataManager");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  const deviceState = useDeviceStore((state) => state.deviceStates[device.id] ?? false);
  const setDeviceState = useDeviceStore((state) => state.setDeviceState);

  useEffect(() => {
    const getDeviceState = async () => {
      const getStateResult = await dataManager.getValveState(device.id);
      if (getStateResult?.isSuccess) {
        setDeviceState(device.id, convertPinState(getStateResult.result.state));
      }
    };
    getDeviceState();
  }, [device.id]);

  const handleClose = () => {
    setOpen(false);
  }

  const onEditClick = () => {
    setTitle("Edit Valve")
    setOpen(true)
  }

  const onDeleteClick = () => {
    setConfirmDelete(true)
  }

  const onClickDeleteConfirm = async () => {
    const deleteResult = await dataManager.deleteValve(device.id)
    setConfirmDelete(false)
    if (deleteResult?.isSuccess) {
      dataManager.refreshValves()
    }
  }

  const onClickDeleteCancel = () => {
    setConfirmDelete(false);
  }

  const onPinStateChanged = async () => {
    const getResult = await dataManager.setValveState({
      id: device.id,
      state: convertPinState(!deviceState)
    });
    
    if (getResult.isSuccess) {
      setDeviceState(device.id, convertPinState(getResult.result));
      await dataManager.refreshPump(); 
    }
  };

  return (
    <>
      <Card key={device.id} sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {device.name}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1.5 }}>
            State: <Switch 
                     checked={Boolean(deviceState)} 
                     onChange={onPinStateChanged} 
                   />
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onEditClick} variant="outlined" startIcon={<Edit />}>
            Edit
          </Button>
          <Button
            onClick={onDeleteClick}
            variant="outlined"
            startIcon={<Delete />}
          >
            Delete
          </Button>
          <DeviceDialog
            title={title}
            device={device}
            open={open}
            onClose={handleClose}
          />
        </CardActions>
      </Card>
      <MessageDialog 
        open={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${device.name}?`}
        onConfirm={onClickDeleteConfirm}
        onCancel={onClickDeleteCancel}
      />
    </>
  );
};

export default Device;
