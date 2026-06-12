import MainMenu from "./MainMenu.jsx";
import DeviceStatuses from "./DeviceStatuses.jsx";
import OperationPanel from "./OperationPanel.jsx";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Settings } from "@mui/icons-material";
import SettingsDialog from './SettingsDialog.jsx'
import NotificationDock, {
  NOTIFICATION_DOCK_COLLAPSED_HEIGHT,
  NOTIFICATION_DOCK_EXPANDED_HEIGHT,
} from './NotificationDock.jsx'
import { useState } from 'react'

const Dashboard = () => {
  const [open, setOpen] = useState(false)
  const [notificationDockExpanded, setNotificationDockExpanded] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const onClick = () => {
    setOpen(true)
  }

  return (
    <Stack
      spacing={2}
      sx={{
        minHeight: '100vh',
        pb: `${notificationDockExpanded ? NOTIFICATION_DOCK_EXPANDED_HEIGHT : NOTIFICATION_DOCK_COLLAPSED_HEIGHT}px`,
        transition: theme => theme.transitions.create('padding-bottom', {
          duration: theme.transitions.duration.shortest,
        }),
      }}
    >
      <Stack direction='row' sx={{ justifyContent: "space-between", alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}>Dashboard</Typography>
        <Button variant="overlined" onClick={onClick} startIcon={<Settings size='large' sx={{ fontSize: 30 }} />} />
        <SettingsDialog open={open} onClose={handleClose} />
      </Stack>

      <Stack spacing={2}>
        <Box>
          <DeviceStatuses />
        </Box>
        <Box>
          <OperationPanel />
        </Box>
        <Box>
          <MainMenu />
        </Box>
      </Stack>
      <NotificationDock
        expanded={notificationDockExpanded}
        onToggle={() => setNotificationDockExpanded(current => !current)}
      />
    </Stack>
  );
};

export default Dashboard;
