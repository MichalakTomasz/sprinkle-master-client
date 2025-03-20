import { Box, TextField, Button, Alert } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import container from "../container/container";

const validationSchema = Yup.object({
  pinNo: Yup.number()
    .min(0, "GPIO pin must be greater than 0.")
    .max(40, "GPIO has max 40 pins.")
    .required("Required"),
  name: Yup.string().required("Required"),
});

const DeviceForm = ({ device }) => {
  const isUpdate = device != undefined;
  const dataManager = container.resolve("dataManager");
  const [apiResult, setApiResult] = useState(null);

  const onSubmit = async (values) => {
    if (isUpdate) {
      try {
        const updateResult = await dataManager.updateValve({
          id: values.id,
          name: values.name,
          pinNo: values.pinNo,
          type: values.type,
        })

        if (updateResult) {
          setApiResult({
            message: `Update Valve error: ${updateResult?.message}`,
            severity: updateResult?.isSuccess ? "success" : "error",
          })
          if (updateResult.isSuccess) {
            await dataManager.refreshValves();
          }
        }
      } catch (e) {
        setApiResult({
          message: `Update Valve error: ${e.message}`,
          severity: "error",
        })
      }
    } else {
      const addResult = await dataManager.addValve({
        name: values.name,
        pinNo: values.pinNo,
      })

      if (addResult) {
        setApiResult({
          message: `Update Valve error: ${addResult.message}`,
          severity: addResult?.isSuccess ? "success" : "error",
        })
        if (addResult.isSuccess) {
          await dataManager.refreshValves();
        }
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      id: isUpdate ? device.id : 0,
      name: isUpdate ? device.name : "",
      pinNo: isUpdate ? device.pinNo : 0,
      type: isUpdate ? device.type : "",
    },
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  })

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
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="GPIO pin"
          type="numeric"
          name="pinNo"
          value={formik.values.pinNo}
          onChange={formik.handleChange}
          error={formik.touched.pinNo && formik.errors.pinNo}
          helperText={formik.touched.pinNo && formik.errors.pinNo}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="outlined" type="submit">
          {isUpdate ? "Update" : "Add"}
        </Button>
        {apiResult && (
          <Alert severity={apiResult.severity} sx={{ mt: 2 }}>
            {apiResult.severity == "success"
              ? isUpdate
                ? "Valve updated successful."
                : "The Valve added successful."
              : apiResult.message}
          </Alert>
        )}
      </Box>
    </>
  )
}

export default DeviceForm;
