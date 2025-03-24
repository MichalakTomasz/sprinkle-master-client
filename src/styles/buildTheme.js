import { createTheme } from '@mui/material/styles';

export const buildTheme = themeColors => createTheme({
  palette: {
    text: {
      primary: themeColors.textColor,
      disabled: '#f50a31'
    }    
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: themeColors.backgroundColor,
          minHeight: '100vh',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.cardColor,
          border : `3px solid ${themeColors.borderColor}`,
          borderRadius: '9px',
          color: themeColors.textColor
        }        
      }
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          border: `2px solid ${themeColors.textColor}`
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: themeColors.textColor,
          '& .Mui-selected:': {
            color: themeColors.selectedElement
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: themeColors.cardColor,
          border: `3px solid ${themeColors.borderColor}`,
        },
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: themeColors.textColor,
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: themeColors.borderColor
            }         
          },
        }

      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: themeColors.textColor
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: themeColors.textColor, // Kolor tekstu
          padding: '8px 12px', // Padding wewnętrzny
          border: `1px solid ${themeColors.borderColor}`, // Globalna ramka dla Select
          '&:hover': {
            borderColor: themeColors.borderColor, // Kolor ramki w stanie hover
          },
          '&.Mui-focused': {
            borderColor: '#d32f2f', // Kolor ramki w stanie focus
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: themeColors.textColor
        },
        icon: {
          color: themeColors.borderColor, // Kolor ikony strzałki
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: themeColors.backgroundColor, // Tło listy rozwijanej
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: themeColors.borderColor, // Tło elementu podczas najechania myszką
          },
          '&.Mui-selected': {
            color: themeColors.textColor, // Kolor tekstu zaznaczonego elementu
          },
          color: themeColors.textColor
        },
      },
    },
  },
})