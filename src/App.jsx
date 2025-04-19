import Dashboard from './components/Dashboard.jsx'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { buildTheme } from './styles/buildTheme.js'
import styles from './styles/styles.js'
import useDeviceStore from './store/deviceStore.js'
import { useEffect, useState } from 'react'

const App = () => {
  const [theme, setTheme] = useState({})
  const themeId = useDeviceStore(state => state.themeId)
  
  useEffect(() => {
    const selectedStyle = styles.find(s => s.id == themeId)
    const theme = buildTheme(selectedStyle)
    setTheme(theme)
  }, [themeId])
  
  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <Box sx={{ width: '100%'}}>
          <Dashboard/>
        </Box>
      </>
    </ThemeProvider>
  )
}

export default App
