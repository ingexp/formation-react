import React from 'react';

const Field = ({name,label,value,onChange,type="text",error = "",placeholder}) => 
     (  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input type={type} 
        value={value}
        onChange={ onChange}
        className= { "form-control" + (error  && " is-invalid") }
        id={name} 
        name={name} 
        placeholder={placeholder}
        
        />
       { error && <p className="invalid-feedback">{error}</p>  }
</div> );

 
export default Field;