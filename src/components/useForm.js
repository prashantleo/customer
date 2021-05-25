import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, setCurrentId) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})


    

    const handleInputChange = e => {
        const { name, value } = e.target
        const fieldValue = { [name]: value }
        setValues({
            ...values,
            ...fieldValue
        })
        
    }

    const resetForm = () => {
        setErrors({})
        setValues({
            ...initialFieldValues
        })
        
        setCurrentId(0)
    }
   

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm; 