  
const styles = {

  textField: {
    width: 185,
  },

    bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: 20,
    },
  },

  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: '#cc2200',
    border: '1px solid #fff',
    fontSize: 16,
    height:'26px',
    color:'#fff',
    padding: '10px 12px',
    '&:focus': {
      borderWidth: '2px',
      padding: '9px 11px'
    },
  },

  bootstrapFormLabel: {
    fontSize: 19,
    color:'#fff !important',
  },

  textfieldError: {
    '&>input': {

      backgroundColor: 'white',
      color: 'red',
    }
  },

  helperTextRoot: {

      padding: '2px 3px 2px 3px',
      visibility: 'hidden',
      borderRadius: '2px',
      color: '#fff !important',
      backgroundColor: 'red',
    },


  helperTextError: {
      visibility: 'visible',
    }

}

export default styles;