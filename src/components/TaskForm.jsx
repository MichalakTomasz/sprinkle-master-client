import {
  Box,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import Period from "../models/Period.js";
import SimpleDevice from "./SimpleDevice.jsx";
import { Delete } from "@mui/icons-material";
import useDeviceStore from "../store/deviceStore";
import { useEffect, useState } from "react";
import container from "../container/container.js";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
});

const TaskForm = ({ task }) => {
  const dataManager = container.resolve("dataManager");
  const isUpdate = task != undefined;
  const valves = useDeviceStore((state) => state.valves || []);
  const [selectedValve, setSelectedValve] = useState("");
  const [currentDevices, setCurrentDevices] = useState([]);
  const [apiResult, setApiResult] = useState(null);

  useEffect(() => {
    if (task?.devices?.length > 0) {
      setCurrentDevices([...task.devices]);
    }
  }, []);

  const onSubmit = async (values) => {
    if (isUpdate) {
      const updateResult = await dataManager.updateTask({
        id: values.id,
        name: values.name,
        start: values.start,
        stop: values.stop,
        period: values.period,
        isActive: values.isActive,
      });

      if (updateResult) {
        setApiResult({
          message: `Update Task error: ${updateResult?.message}`,
          severity: updateResult?.isSuccess ? "success" : "error",
        })
      }

      const devicesToAdd = currentDevices?.filter(
        (c) => !task?.devices?.some((d) => d.id == c.id)
      )

      const devicesToDelete = task?.devices?.filter(
        (d) => !currentDevices?.some((c) => d.id == c.id)
      )

      if (devicesToAdd) {
        for (const deviceToAdd of devicesToAdd) {
          const assignResult = await dataManager.assignToTask({
            valveId: deviceToAdd.id,
            taskId: task.id,
          });

          if (assignResult) {
            setApiResult({
              message: `Add valve error: ${assignResult?.message}`,
              severity: assignResult?.isSuccess ? "success" : "error",
            });
          }
        }
      }

      if (devicesToDelete) {
        for (const deviceToTelete of devicesToDelete) {
          const unassignResult = await dataManager.unassignFromTask({
            valveId: deviceToTelete.id,
            taskId: task.id,
          });

          if (unassignResult) {
            setApiResult({
              message: `Add valve error: ${unassignResult?.message}`,
              severity: unassignResult?.isSuccess ? "success" : "error",
            });
          }
        }
      }
    } else {
      const addResult = await dataManager.addTask({
        name: values.name,
        start: values.start,
        stop: values.stop,
        period: values.period,
        isActive: values.isActive,
      })

      if (addResult) {
        setApiResult({
          message: `Add Task error: ${addResult?.message}`,
          severity: addResult?.isSuccess ? "success" : "error",
        })
      }

      for (const deviceToAdd of currentDevices) {
        const assignResult = await dataManager.assignToTask({
          valveId: deviceToAdd.id,
          taskId: addResult.result.id,
        })

        if (assignResult) {
          setApiResult({
            message: `Add valve error: ${assignResult?.message}`,
            severity: assignResult?.isSuccess ? "success" : "error",
          })
        }
      }
    }

    dataManager.refreshTasks();
  }

  const onDeleteClick = async (deviceToDelete) => {
    const updatedDevices = currentDevices.filter(
      (d) => d.id !== deviceToDelete.id
    );
    setCurrentDevices(updatedDevices);
  }

  const onChangeValveSelect = (event) => {
    setSelectedValve(event.target.value);
  }

  const onClickAddValve = async () => {
    if (selectedValve) {
      setCurrentDevices([...currentDevices, selectedValve]);
      setSelectedValve("");
    }
  };

  const formik = useFormik({
    initialValues: {
      id: isUpdate ? task.id : 0,
      name: isUpdate ? task.name : "",
      start: isUpdate ? task.start : "",
      stop: isUpdate ? task.stop : "",
      period: Period.EVERYDAY,
      isActive: isUpdate ? task?.isActive : false,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          "& .MuiTextField-root": { width: "100%" },
        }}
      >
        <TextField
          label="Name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          label="Start Time"
          type="time"
          name="start"
          value={formik.values.start}
          onChange={formik.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Stop Time"
          type="time"
          name="stop"
          value={formik.values.stop}
          onChange={formik.handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box>
          {currentDevices?.map((device) => (
            <Stack key={device.id} direction="row">
              <SimpleDevice device={device} />
              <Button
                variant="overlined"
                onClick={() => onDeleteClick(device)}
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </Stack>
          ))}
        </Box>
        <Stack direction="row" spacing={2} alignItems="center">
          <Select
            value={selectedValve}
            onChange={onChangeValveSelect}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="" disabled>
              Select valve
            </MenuItem>
            {valves
              ?.filter((v) => !currentDevices?.some((d) => v.id == d.id))
              .map((valve) => (
                <MenuItem key={valve.id} value={valve}>
                  {valve.name}
                </MenuItem>
              ))}
          </Select>
          <Button
            variant="outlined"
            onClick={onClickAddValve}
            disabled={!selectedValve}
          >
            Add Valve
          </Button>
        </Stack>
        <Button variant="outlined" type="submit">
          {isUpdate ? "Update" : "Add"}
        </Button>
        {apiResult && (
          <Alert severity={apiResult.severity} sx={{ mt: 2 }}>
            {apiResult.severity == "success"
              ? isUpdate
                ? "Task updated successful."
                : "Task added successful."
              : apiResult.message}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default TaskForm;
