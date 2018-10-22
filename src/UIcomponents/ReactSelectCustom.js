import React, { Component } from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]



const customStyles = {

container: (base, state) => ({
  ...base,
  zIndex: 20,
  outline: 0,
  width: 230,
}),


  option: (base, state) => ({
    ...base,
    color:'rgba(0, 0, 0, 0.87)',
    backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.10)' : '#fff'
  }),

    placeholder: (base, state) => ({
    ...base,
    color: '#fff',
  }),

  valueContainer: (base, state) => ({
    ...base,
    color: '#fff !important',
  }),



  control: (base, state) => ({
    ...base,

    // none of react-selects styles are passed to <View />
    border:'1px solid',
    borderColor: '#fff !important',
    borderRadius: '4px',
    backgroundColor: '#cc2200',
    outline: 0,
    boxShadow: 'none',
    padding: '5px 0px 5px'
  }),


  dropdownIndicator: (base, state) => ({

    ...base,
    color: '#fff'
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    // return { ...base, opacity, transition };
  }),


  indicatorSeparator: (base, state) => ({

    ...base,
    backgroundColor: '#fff'
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    // return { ...base, opacity, transition };
  }),

  singleValue: (base, state) => ({

    ...base,
    color: '#fff'
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    // return { ...base, opacity, transition };
  })
}


var getVal = function(a,b) {

    return null;
  }


const ReactSelectCustom = (props) => (
  <Select onChange={(obj,act) => props.onChange(obj,act,props.name)} name={props.name} value={props.value} placeholder={props.placeholder} options={options} styles={customStyles} />
)

export default ReactSelectCustom;