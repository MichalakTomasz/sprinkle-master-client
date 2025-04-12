import { createTheme } from '@mui/material/styles';

export const buildTheme = themeColors => createTheme({
  palette: {
    text: {
      primary: themeColors.textColor,
    },   
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
    MuiButton: {
      styleOverrides:{
          root: {
            borderColor: themeColors.borderColor,
            color: themeColors.textColor,
            '&.Mui-disabled': {
              color: themeColors.disabledColor,
              borderColor: themeColors.borderColor
          },
          },          
      }
    },
    MuiSwitch: {
      styleOverrides: {
        track: {
          border: `2px solid ${themeColors.textColor}`,
          backgroundColor: themeColors.textColor,
          '&.Mui-checked': {
            backgroundColor: themeColors.textColor, // Kolor tła przełącznika w stanie zaznaczonym
          },
        },
        switchBase: {
          color: themeColors.textColor,
          '&.Mui-checked': {
            color: themeColors.textColor, // Kolor przełącznika w stanie zaznaczonym
          },
        },
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: themeColors.textColor,
          '&.Mui-selected': {
            color: themeColors.textColor
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
            backgroundColor:  themeColors.textColor
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
          '&.MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: themeColors.borderColor
            },     
          },
          '& input[type="time"]::-webkit-calendar-picker-indicator': {
            filter: 'invert(50%) sepia(100%) saturate(500%) hue-rotate(200deg) brightness(20%) contrast(20%)'
          },
          '& input[type=number]::-webkit-inner-spin-button': {
            color: themeColors.textColor, // Zmień kolor strzałek
          },
          '& input[type=number]::-webkit-outer-spin-button': {
            color: 'red', // Zmień kolor strzałek
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
            borderColor: themeColors.border, // Kolor ramki w stanie focus
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: themeColors.textColor
        },
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
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          color: themeColors.textColor,
        },
      },
    },
  },
})