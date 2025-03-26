import Nav from './components/Nav'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { buildTheme } from './styles/buildTheme.js'
import themes from './styles/themes.js'
import useDeviceStore from './store/deviceStore.js'
import { useEffect, useState } from 'react'

const App = () => {
  const [theme, setTheme] = useState(themes[0] || {}) 
  const themeId = useDeviceStore(state => state.themeId)
  
  useEffect(() => {
    const selectedTheme = themes.find(t => t.id === themeId)
    setTheme(selectedTheme || themes[0])
  }, [themeId])
  
  return (
    <ThemeProvider theme={buildTheme(theme)}>
      <>
        <CssBaseline />
        <Box sx={{ width: '100%'}}>
          <Nav/>
        </Box>
      </>
    </ThemeProvider>
  )
}

export default App
