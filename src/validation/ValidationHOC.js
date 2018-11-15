
import React, { Component } from 'react';
import validation from './validation';
import validators from './validators';

// This function takes a component...
function ValidationHoc(FormPage) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleInputEvent = this.handleInputEvent.bind(this);
      this.getHelperText = this.getHelperText.bind(this);
      this.hasErrors = this.hasErrors.bind(this);
      this.getVal = this.getVal.bind(this);
      // this.loadConfig = this.loadConfig.bind(this);
      this.setFields = this.setFields.bind(this);
      this.reactSelectChangeHandler = this.reactSelectChangeHandler.bind(this);
      this.richTextEditorHandler = this.richTextEditorHandler.bind(this);
      this.prepForValidationSetValue = this.prepForValidationSetValue.bind(this);
      this.setData = this.setData.bind(this);

      this.state = {


        fieldConfig: {},
        errorList: {},
        checkForm: true

      }

    }


    getVal = (fieldName) => {

      if(!this.state) return;
      return this.state[fieldName];

    }

    componentDidMount() {

    }

    componentWillMount() {


      if(this.props.stepState && this.props.stepState.fieldConfig) {

        this.setState(this.props.stepState);

      } else {

        const fieldData = FormPage.getFieldData();
        this.setFields(fieldData);
      }


    }




    //extend HOC state with data loaded from backend
    setData = (data) => {

      let promise = new Promise((resolve,reject) => {

        let stateCopy = Object.assign({},this.state);
        let updatedState = Object.assign(stateCopy, data);
        this.setState(updatedState, () => resolve('success') );
    
        });

        return promise;
    }

    //initially fields in HOC
    setFields = (fieldData) => {


      fieldData.fieldNames.forEach(f => { this.setState({[f]:''}); 
        this.setState({ [f+'Errors']:{errors:{}, isDirty: false } }); });

      if(fieldData.fieldConfig) { 

        this.setState({ fieldConfig: fieldData.fieldConfig }); 
        this.setState({ fieldNames: fieldData.fieldNames }); 


      }

    }



  //If using wizard, save for wizard state
  externalFunc = () => {

    if(this.props.saveStageState) {
    this.props.saveStageState(this.state);
    }

  }



  richTextEditorHandler = (event_type ,rawState, plainText, input_name) => {



      this.prepForValidationSetValue(event_type, input_name, rawState, plainText );

  }


  reactSelectChangeHandler = (selected_option, action, select_name) => {

    let tvalue = selected_option;
    let tname = select_name;

   this.prepForValidationSetValue('onBlur', tname, tvalue)

 }



 handleInputEvent = (event) => {

  if(!event) return;

  var tvalue = event.target.value;
  var tname = event.target.name;
  var event_type = event.type == 'blur' ? 'onBlur' : 'onChange';


  this.prepForValidationSetValue(event_type,tname,tvalue);



    // setTimeout(() => { this.externalFunc() }, 200);
  
}








prepForValidationSetValue = (event_type, tname, tvalue, editorText = undefined ) => {

  var tobj = {};
  tobj.name = tname;

  if(editorText !== undefined) {

    tobj.value = editorText;
    tvalue = { raw: tvalue, text: editorText }

  } else {

      tobj.value = tvalue;

  }

  const errname = tname+'Errors';

  var vrules = this.state.fieldConfig[tname];
      // if(!vrules) return;

      let dirty = this.state[errname].isDirty;


      if(vrules) {
        if(event_type === 'onBlur' && !dirty) { 

          dirty = true;

          this.setState((prev, props) => ({[errname]:{ isDirty: true, errors: prev[errname].errors}}), 
            () => { this.initValidation( event_type, vrules, tobj, dirty, errname ) }); 
        }

        else {

          if(vrules[0].behavior) {
            let valid = false;
            for(var i = 0; i < vrules.length; i++) {
            if(!vrules[i].behavior) break;
            valid = validators[vrules[i].name](tobj.value, vrules[i].testval);
            if(!valid) break;
            }

            valid ? this.setState({ [tname]: tvalue }, () => { 
              // this.externalFunc();
              this.initValidation( event_type, vrules, tobj, dirty, errname ) }) : null; 


          } else {

            this.setState({ [tname]: tvalue }, () => { 
              // this.externalFunc();
              this.initValidation( event_type, vrules, tobj, dirty, errname ) }); 
          }
        }
      } else {

        this.setState({ [tname]: tvalue }, () => { this.externalFunc() }); 
      }

    }



    initValidation = ( event_type, vrules, tobj, isDirty, errname ) => {

      let vresult = validation.validate(event_type, vrules, tobj, isDirty, null, this.getVal);
      this.setState((prev, props) => ({ [errname]: { errors: vresult.errors, isDirty: isDirty  } }), () => { this.externalFunc()});

      this.updateErrorList(tobj, vresult.errorListEntries);

      this.initCascadeValidation(vresult);

    }




    initCascadeValidation = (vresult) => {

      if(vresult.vafter.length > 0) {

        for(var i = 0; i < vresult.vafter.length; i++) {

          let ttobj = {}
          let vinfo = vresult.vafter[i];
          let vname = null;

          if(vinfo.indexOf(';') !== -1) {
            ttobj.name = vinfo.split(";")[0];
            let vname = vinfo.split(";")[1];
          } else {

            ttobj.name = vinfo;
          }



          ttobj.value = this.state[ttobj.name];

          //support richTextEditor
          if(ttobj.value.getPlainText !== undefined) {

              ttobj.value = ttobj.value.getPlainText();
          }

          let errorData = this.state[ttobj.name + 'Errors']; 
          let dirty = errorData.isDirty;

          if(!dirty) return;

          let vvrules = this.state.fieldConfig[ttobj.name];
          let vvresult = validation.validate(null, vvrules, ttobj, true, vname, this.getVal);

          if(vname) {
            let error = errorData.errors[vname];
            let error_count = Object.keys(vvresult.errors).length;

            if(error_count > 0 && error) return;

            let error_data_copy = Object.assign({}, errorData);

            if(error_count > 0 && !error) {
              error_data_copy.errors[vname] = vvresult.errors[vname]; 
            } 
            else if(error_count === 0 && error) {

              delete error_data_copy.errors[vname];
            } 
            else if(error_count === 0 && !error) {

              return;
            }

            this.setState({ [ttobj.name+'Errors']: error_data_copy });

            return;
          }


          else  {

           this.setState({ [ttobj.name+'Errors']: {errors: vvresult.errors , isDirty: dirty } });
         }


       }
     }


   }




   updateErrorList = (tobj,errors) => {

     let errorListCopy = Object.assign({}, this.state.errorList);
     let error_count = Object.keys(errors).length

     if(error_count > 0)
     { 
      errorListCopy[tobj.name] = errors; 
    }

    else {
      delete errorListCopy[tobj.name];
    }

    this.setState({errorList: errorListCopy});
  }


  hasErrors = (fieldName) => {

    if(Object.keys(this.state[fieldName+'Errors'].errors).length === 0) return false;

    return true;
  }


  getHelperText = (fieldName, displayError = true) => {


    let fieldErrors = this.state[fieldName+'Errors'].errors;

    let error_count = Object.keys(fieldErrors).length;

    if(error_count === 0) return ' ';


    var key = Object.keys(fieldErrors)[0];
    var msg = validation.get_error_message(fieldErrors[key].error_code || key );

    return displayError ? msg : 'Error';
  }


  handleSubmit = (fieldNames) => {

    const fc = this.state.fieldConfig;
    const stateCopy = Object.assign({},this.state);
    var getVal = this.getVal;
    const error_data = validation.validateForm(fc, stateCopy, fieldNames, getVal);

    //not passing state.password explicityly anymore and counting on it being on the value prop
    if(error_data.count > 0) {

      this.setState({...error_data.errorsForFields}, () => {alert('form has ' +error_data.count+ ' errors' + 'will not post'); });

      
    } else {

      //implement authentication
      this.props.doLogin();

    }

  }


  // loadConfig = (fc) => {

  //   this.setState({fieldConfig: fc});
  // }


  render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <FormPage setData={this.setData} saveEditorState={this.richTextEditorHandler} errorList={this.state.errorList} setFields={this.setFields} hasErrors={this.hasErrors} handleInputEvent={this.handleInputEvent} getHelperText={this.getHelperText} handleSubmit={this.handleSubmit} reactSelectChangeHandler={this.reactSelectChangeHandler} {...this.props} {...this.state} />;
    }
  };
}


export default ValidationHoc;