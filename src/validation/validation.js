import validators from './validators';
import error_messages from './error_messages';




class validation {

	// constructor() {

	// 	this.validate = this.validate.bind(this);
	// }

	static get_error_message = (vname) => {

		return error_messages[vname];
	}



	static validate = (event_type, vrules, tobj, isDirty, constraint, getVal) => {

		if(!vrules) return;

		let tvalue, tname;
		let errors = {};
		let vafter = [];
	    let errorListEntries = {};

			 	 // var tobj = tobj || event.target || event ;

			 	 tvalue = tobj.value;
			 	 tname = tobj.name;


			 	 for(var i = 0; i < vrules.length; i++) {


			 	 	let valid = false;
			 	 	let vruleName;
			 	 	let vrule = vrules[i];
			 	 	let error_code;


			 	 	if(vrule.behavior && vrule.behavior === 'blocking') continue;

			 	 	//constraint to validating only one vrule
			 	 	if(constraint && vrule.name !== constraint) continue;

			 	    //if not dirty and dom event type does not match vrule event type, continue.
			 	    if(!isDirty && (vrule.event_type && vrule.event_type !== event_type)) { continue; }

			 	    //Even if dirty, when dom event type does not match vrule event type, continue if event_strict is true.
			 	    else if((isDirty && vrule.event_strict) && (vrule.event_type && vrule.event_type !== event_type)) {continue; }

			 	 		valid = validators[vrule.name](tvalue, vrule.testval, isDirty, getVal);
			 	 		vruleName = vrule.name;
			 	 		error_code = vrule.error_code || null;
			 	 		if(vrule.after) vafter = vafter.concat(vrule.after);


			 	 	if(!valid) {

			 	 		// errors.push({ vname: vruleName, error_code: error_code });
			 	 		errors[vruleName] = { error_code: error_code || null }

			 	 		if(vrule.displayOn) {
			 	 		if(vrule.displayOn === 'error-list' || vruleName.displayOn === 'all') {

			 	 			errorListEntries[vruleName] = { error_msg: validation.get_error_message(error_code || vrule.name) }
			 	 		}
			 	 	  }
			 	 	}


			 	 	   if(constraint && vrule.name === constraint) break;

			 	 }

			 	 return {errors: errors, vafter: vafter, errorListEntries: errorListEntries }

			 	}



			 	static validateForm = (fc, stateCopy, fieldNames, getVal ) => {

			 		var error_data = {count:0 , errorsForFields: []}

			 		for(var prop in stateCopy) {

			 			if(fieldNames.indexOf(prop) === -1) continue;

			 			let fname = prop;
			 			var vrules = fc[fname];
			 			if(!vrules) continue;

			 			var val = stateCopy[prop];

			 			if(val.text !== undefined)   { val = val.text; }

			 			let tobj = {name: fname, value: val }

			 			// if(el.props.name === 'password') {

			 			// 	tobj.value = pass || null;
			 			// }


			 			var fieldErrors = validation.validate('onBlur', vrules, tobj, true, null, getVal).errors;

			 			error_data.errorsForFields[fname+'Errors'] = { errors: fieldErrors, isDirty: true  };

			 			error_data.count += Object.keys(fieldErrors).length;
			 		}

			 		return error_data;
			 	}



			 }



			 export default validation;