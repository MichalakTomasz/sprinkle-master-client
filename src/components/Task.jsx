import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Switch,
  Button,
  Box,
  Stack,
} from "@mui/material";
import {
  Edit,
  Delete,
  InvertColors,
  InvertColorsOff,
} from "@mui/icons-material";
import SimpleDevice from "./SimpleDevice.jsx";
import { useEffect, useState } from "react";
import TaskDialog from "./TaskDialog";
import PinState from "../models/PinState.js";
import container from "../container/container.js";
import MessageDialog from "./MessageDialog.jsx";

const Task = ({ task }) => {
  const dataManager = container.resolve("dataManager");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isActiveState, setIsActiveState] = useState(false);

  useEffect(() => {
    setIsActiveState(task?.isActive ?? false);
  }, []);

  const onClickClose = () => {
    setOpen(false);
  };

  const onEditClick = () => {
    setTitle("Edit Task");
    setOpen(true);
  };

  const onDeleteClick = () => {
    setConfirmDelete(true);
  };

  const onOpenClick = async () => {
    await dataManager.setTaskState({
      id: task.id,
      state: PinState.HIGH,
    });
  };

  const onCloseClick = async () => {
    await dataManager.setTaskState({
      id: task.id,
      state: PinState.LOW,
    });
  };

  const onClickDeleteConfirm = async () => {
    const deleteResult = await dataManager.deleteTask(task.id);
    setConfirmDelete(false);
    if (deleteResult?.isSuccess) {
      dataManager.refreshTasks();
    }
  };

  const onClickDeleteCancel = () => {
    setConfirmDelete(false);
  };

  const onClickCheckedChange = async () => {
    
    const updateResult = await dataManager.updateTask({
      id: task.id,
      name: task.name,
      start: task.start,
      stop: task.stop,
      period: task.period,
      isActive: !isActiveState,
    });

    if (updateResult) {
        setIsActiveState(updateResult?.result?.isActive)
        console.log(updateResult)
    }
  };

  return (
    <>
      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Box>
            <Typography variant="h5" component="div" gutterBottom>
              {task.name}
            </Typography>
            <Box display="flex" alignItems="center">
              <Stack spacing={2} direction="row" alignItems="center">
                <Button onClick={onCloseClick} startIcon={<InvertColorsOff />}>
                  Close
                </Button>
                <Button onClick={onOpenClick} startIcon={<InvertColors />}>
                  Open
                </Button>
              </Stack>
            </Box>
            <Typography component="div">Start: {task.start}</Typography>
            <Typography component="div">Stop: {task.stop}</Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography component="span">Active:</Typography>
              <Switch checked={isActiveState} onChange={onClickCheckedChange} />
            </Box>
          </Box>
          <Box mt={2}>
            {task.devices?.map((device) => (
              <SimpleDevice key={device.id} device={device} />
            ))}
          </Box>
          <CardActions>
            <Button
              onClick={onEditClick}
              variant="outlined"
              startIcon={<Edit />}
            >
              Edit
            </Button>
            <Button
              onClick={onDeleteClick}
              variant="outlined"
              startIcon={<Delete />}
            >
              Delete
            </Button>
            <TaskDialog
              title={title}
              task={task}
              open={open}
              onClose={onClickClose}
            />
          </CardActions>
        </CardContent>
      </Card>
      <MessageDialog
        open={confirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete ${task.name}?`}
        onConfirm={onClickDeleteConfirm}
        onCancel={onClickDeleteCancel}
      />
    </>
  );
};

export default Task;
