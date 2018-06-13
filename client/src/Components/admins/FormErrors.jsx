import React from 'react';

 export const FormErrors = ({formErrors}) => 
 // The Object.keys() method returns an array of a given object's property names, in the same order as we get with a normal loop.
   
   <div className='formErrors'>
      {Object.keys(formErrors).map((fieldName, i) => {
        if(formErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )        
        } else {
        return '';
      }
    })}
  </div>

export default FormErrors;


//Using Tutorial: https://github.com/learnetto/react-form-validation-demo/blob/master/src/FormErrors.js
