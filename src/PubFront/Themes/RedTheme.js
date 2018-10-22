import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#cc2000',
      contrastText: '#fff',
      dark:'#000'
    },
    secondary: {
      main: '#000',
      contrastText: '#000',
    }
  },


  overrides: {
    MuiButton: { // Name of the component ⚛️ / style shee
      root: { 
      // Name of the rule
      },

      raised: {
        backgroundColor: '#ea4527',
           '&:hover': {
          backgroundColor: '#b92a10'
        }
      },


    },

     MuiSvgIcon: { // Name of the component ⚛️ / style shee
      root: {

        color: 'white'
      }
    },

    MuiDivider: { // Name of the component ⚛️ / style shee
      root: {

        backgroundColor: '#b92a10'
      }
    },



    MuiFormControl: {

      root: {

        borderRadius: 2
      }
    },

    MuiAppBar: {

        root: {
    flexGrow: 0,
    boxShadow: '0px 1px  1px rgba(0, 0, 0, 0.5)'
  }

    },


    MuiInput: {

      underline: {
    '&:after': {
        borderColor: '#337ab7 !important'
            },
      }
    }



  }


});


export default theme;