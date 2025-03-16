import {
    CardContent,
    Typography,
    Card,
  } from "@mui/material";
  
  const SimpleDevice = ({ device }) => {
    return (
      <Card key={device.id} sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {device.name}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
  export default SimpleDevice;
  