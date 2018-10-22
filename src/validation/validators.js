
const validators = {

	required: function(val) {

		if (!val || val.toString().trim().length === 0) {

			return false;

		} else { 

		  return true
		}
	},

   alphabetic: function(val) {

      if(!this.required(val)) return true;

          var re = /^[A-Za-z\s]+$/; 
          let result = re.test(String(val));
          return result;
       },


	email: function(val) {

		if(!this.required(val)) return true;

   	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   	    let result = re.test(String(val).toLowerCase());
   	    return result;
   	 },

   	 minlength: function(val, testval) {

   	    if(!this.required(val)) return true;

   	 	return (val.length < testval ? false: true);
   	 },

   	 includes: function(val, testval, event_type, getVal) {

   	 	var expected = getVal(testval);

   	 	if(!expected  ) return false;

	   	 	var test;

	   	 	test = expected.substring(0, (val.length)); 
	   	 
	   	 	if( test == val && expected.length >= val.length) return true;

   	 	return false;
   	 },

   	match: function(val, testval, isDirty, getVal) {

   	 	var expected = getVal(testval);

   	 	if(!expected) return true;
   	
   	 	if( expected == val) return true;

   	 	return false;
   	 },


   	 confirmCheck: function(val, testval, event_type, getVal) {

   	 	var confirm_val = getVal(testval);

   	 	if(!this.required(val) || !confirm_val ) return true;

	   	 	var test;

	   	 	test = val.substring(0, (confirm_val.length)); 
	   	 
	   	 	if( confirm_val == test) return true;

   	 	return false;

	},

      number: function(val) {

         if(!val) return true;

         const value = Number(val);

         if (isNaN(value)) return false;
   
         return true;

   },

       number_min: function(val, testval) {

         if(!val) return true;

         const value = Number(val);

         if (isNaN(value)) return false;

         if (value < testval) return false;

         return true;

   },

         number_max: function(val, testval) {

         if(!val) return true;

         const value = Number(val);

         if (isNaN(value)) return false;

         if (value > testval) return false;
   
         return true;

   }



}

export default validators;




