import Nav from './components/Nav'
import { Box } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { buildTheme } from './styles/buildTheme.js'
import { green} from './styles/themes.js'

const App = () => {

  return (
    <ThemeProvider theme={buildTheme(green)}>
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
