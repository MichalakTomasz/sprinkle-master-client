import {
  Box,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl, // Dodaj import FormControl
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import container from "../container/container";
import Settings from "../models/Settings.js";
import themes from '../styles/styles.js'
import useDeviceStore from "../store/deviceStore.js";

const initialValues = {
  autostartScheduler: false,
  pumpStopDelay: 0,
  schedulerTick: 0,
  pumpPinNo: 0,
  theme: ''
};

const validationSchema = Yup.object({
  pumpStopDelay: Yup.number()
    .min(
      0,
      "Delay between stop Pump and Valve can not be smaller than 0 seconds."
    )
    .max(5, "5 seconda is max delay between stop Pump and Valve.")
    .required("Required"),
  schedulerTick: Yup.number()
    .min(1, "Must be greater than or equal to 1")
    .max(60, "Must be less than or equal to 60")
    .required("Required"),
  pumpPinNo: Yup.number()
    .min(0, "Must be greater than or equal to 0")
    .max(40, "Must be less than or equal to 40")
    .required("Required"),
});

const SettingsForm = () => {
  const dataManager = container.resolve("dataManager");
  const [formValues, setFormValues] = useState(initialValues);
  const [apiResult, setApiResult] = useState(null)
  const selectedThemeId = useDeviceStore(state => state.themeId)
  

  useEffect(() => {
    const fetchData = async () => {
      const settingsResult = await dataManager.getSettings();
      const pumpResult = await dataManager.getPump();

      let formValues = {}
      if (settingsResult) {
        const autostartScheduler = settingsResult?.find(
          (s) => s.key == Settings.autostartScheduler
        )?.value;
        const pumpStopDelay = settingsResult?.find(
          (s) => s.key == Settings.pumpStopDelay
        )?.value;
        const schedulerTick = settingsResult?.find(
          (s) => s.key == Settings.schedulerTick
        )?.value;

        formValues = {
          autostartScheduler: Boolean(autostartScheduler || false),
          pumpStopDelay: pumpStopDelay ? pumpStopDelay / 1000 : 0,
          schedulerTick: schedulerTick ? schedulerTick / 1000 : 0,
          pumpPinNo: pumpResult?.pinNo || 0
        }
        setFormValues(formValues)
      }
    };

    fetchData();
  }, [])

  const onChangeTheme = (event) => {
    const selectedThemeId = event.target.value
    const theme = themes.find(t => t.id == selectedThemeId)
    useDeviceStore.getState().setThemeId(theme.id)
  }

  const onSubmit = async (values) => {
    try {
      setApiResult(null);
      const setSettingsResult = await dataManager.setSettings([
        { key: Settings.autostartScheduler, value: values.autostartScheduler },
        { key: Settings.pumpStopDelay, value: values.pumpStopDelay * 1000 },
        { key: Settings.schedulerTick, value: values.schedulerTick * 1000 },
      ]);

      if (setSettingsResult) {
        setApiResult({
          message:`Save settings error: ${setSettingsResult?.message}`,
          severity: setSettingsResult?.isSuccess ? 'success': 'error'
        });
      }
      
      if (setSettingsResult?.isSuccess) {
        const updatePumpResult = await dataManager.updatePump({
          pinNo: values.pumpPinNo,
        });
  
        if (updatePumpResult) {
          setApiResult( {
            message: `Save pinNo  error: ${updatePumpResult?.message}`,
            severity: updatePumpResult?.isSuccess ? 'success': 'error'
          });
        }
      }
      
    } catch (e) {
      setApiResult({
        message: `Error while saving settings: ${e.message}`,
        severity: 'error'
      });
    }
  };

  const formik = useFormik({
    initialValues: formValues,
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
        <FormControlLabel
          control={
            <Switch
              name="autostartScheduler"
              checked={formik.values.autostartScheduler}
              onChange={formik.handleChange}
            />
          }
          label="Autostart Scheduler"
        />
        <TextField
          label="Pump stop delay"
          type="number"
          name="pumpStopDelay"
          value={formik.values.pumpStopDelay}
          onChange={formik.handleChange}
          error={
            formik.touched.pumpStopDelay && Boolean(formik.errors.pumpStopDelay)
          }
          helperText={
            formik.touched.pumpStopDelay && formik.errors.pumpStopDelay
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Scheduler tick"
          type="number"
          name="schedulerTick"
          value={formik.values.schedulerTick}
          onChange={formik.handleChange}
          error={
            formik.touched.schedulerTick && Boolean(formik.errors.schedulerTick)
          }
          helperText={
            formik.touched.schedulerTick && formik.errors.schedulerTick
          }
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Pump GPIO pin number"
          type="number"
          name="pumpPinNo"
          value={formik.values.pumpPinNo}
          onChange={formik.handleChange}
          error={formik.touched.pumpPinNo && Boolean(formik.errors.pumpPinNo)}
          helperText={formik.touched.pumpPinNo && formik.errors.pumpPinNo}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="theme-label">Theme</InputLabel>
          <Select
            labelId="theme-label"
            label="Theme"
            value={selectedThemeId}
            onChange={onChangeTheme}
            InputLabelProps={{
              shrink: true,
            }}
          >
            {themes.map((t) => (
              <MenuItem key={t.id} value={t.id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="outlined" type="submit">
          Update
        </Button>
        {apiResult && (
          <Alert severity={apiResult.severity} sx={{ mt: 2 }}>
            {apiResult.severity == 'success' ?
            'Update settings successful.': 
            apiResult.message}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default SettingsForm;
