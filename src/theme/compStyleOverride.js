export function componentStyleOverrides(themeOption) {
  const { palette, customization } = themeOption;
  const { themeMode, borderRadius } = customization;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'capitalize',
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `${borderRadius}px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: palette.text.dark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        outlined: { border: '1px dashed' },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
          borderRadius: `${borderRadius}px`,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: palette.secondary.main,
            backgroundColor: themeMode === 'dark' ? palette.secondary.main + 15 : palette.secondary.light,
            '&:hover': {
              backgroundColor: themeMode === 'dark' ? palette.secondary.main + 15 : palette.secondary.light,
            },
            '& .MuiListItemIcon-root': {
              color: palette.secondary.main,
            },
          },
          '&:hover': {
            backgroundColor: themeMode === 'dark' ? palette.secondary.main + 15 : palette.secondary.light,
            color: palette.secondary.main,
            '& .MuiListItemIcon-root': {
              color: palette.secondary.main,
            },
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
          '&.Mui-selected': {
            color: palette.secondary.main,
            backgroundColor: themeMode === 'dark' ? palette.secondary.main + 15 : palette.secondary.light,
            '&:hover': {
              backgroundColor: themeMode === 'dark' ? palette.secondary.main + 15 : palette.secondary.light,
            },
            '& .MuiListItemIcon-root': {
              color: palette.secondary.main,
            },
          },
          '&:hover': {
            backgroundColor: themeMode === 'dark' ? palette.secondary.main + 15 : palette.secondary.light,
            color: palette.secondary.main,
            '& .MuiListItemIcon-root': {
              color: palette.secondary.main,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: palette.text.dark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: palette.text.dark,
          '&::placeholder': {
            color: palette.text.secondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '48px',
          background: themeMode === 'dark' ? palette.dark[800] : palette.grey[50],
          borderRadius: `${borderRadius}px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: themeMode === 'dark' ? palette.text.primary + 28 : palette.grey[400],
          },
          '&:hover $notchedOutline': {
            borderColor: palette.primary.light,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          height: 'inherit',
          fontWeight: 500,
          background: 'transparent',
          padding: '0px 14px',
          borderRadius: `${borderRadius}px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `${borderRadius}px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: themeMode === 'dark' ? palette.text.primary + 50 : palette.grey[300],
          },
        },
        mark: {
          backgroundColor: palette.paper,
          width: '4px',
        },
        valueLabel: {
          color: themeMode === 'dark' ? palette.primary.main : palette.primary.light,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-tag': {
            background: themeMode === 'dark' ? palette.text.primary + 20 : palette.secondary.light,
            borderRadius: 4,
            color: palette.text.dark,
            '.MuiChip-deleteIcon': {
              color: themeMode === 'dark' ? palette.text.primary + 80 : palette.secondary.light,
            },
          },
        },
        popper: {
          borderRadius: `${borderRadius}px`,
          boxShadow: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: themeMode === 'dark' ? '#bdc8f0' : palette.grey[200],
          opacity: themeMode === 'dark' ? 0.2 : 1,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: themeMode === 'dark' ? '#29314f' : palette.primary.dark,
          background: themeMode === 'dark' ? palette.text.primary : palette.primary[200],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: palette.text.dark,
          fontSize: '16px',
        },
      },
    },

    MuiTreeItem: {
      styleOverrides: {
        label: {
          marginTop: 14,
          marginBottom: 14,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: themeMode === 'dark' ? '#111936' : palette.primary.light,
          '& .MuiTabs-flexContainer': {
            borderColor: themeMode === 'dark' ? palette.text.primary + 20 : palette.primary[200],
          },
          '& .MuiTab-root': {
            color: themeMode === 'dark' ? palette.grey[500] : palette.grey[900],
          },
          '& .MuiTabs-indicator': {
            backgroundColor: palette.primary.dark,
          },
          '& .Mui-selected': {
            color: palette.primary.dark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            color: palette.text.primary,
          },
        },
      },
    },

    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root.Mui-selected': {
            backgroundColor: themeMode === 'dark' ? palette.secondary.main + 15 : palette.secondary.light,
            '&:hover': {
              backgroundColor: themeMode === 'dark' ? '#323a55' : palette.grey[100],
            },
          },
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: palette.paper,
          background: palette.primary[700],
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
    },
  };
}
