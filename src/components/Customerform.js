 import { TextField } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';

import './Customerform.css'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from '../actions/Customers'
import Grid from '@material-ui/core/Grid'
import Form from './Form'
import Input from './input'





const initialFieldValues={

    customerName:'',
    customerAddress:''

}


const CustomerForm =({classes,...props})=>{

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, props.setCurrentId)
    const validate=()=>{
        let temp={}
        temp.customerName=values.customerName?"" : "This field is required."
        temp.customerAddress=values.customerAddress ? "" : "This field is required."
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }


    const [open, setOpen] = React.useState(false)
const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {

    setOpen(false);
  }
  
  const handleSubmit=e=>{
      e.preventDefault()
      
      if(validate()){
          if(props.currentId==0)
        props.createCustomer(values,()=>{window.alert('insert')})
        else
        props.updateCustomer(props.currentId,values,()=>{window.alert('updated')})
      }
  }
  useEffect(() => {
    if (props.currentId != 0) {
        setValues({
            ...props.CustomerList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }
}, [props.currentId])


    return (<div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
        New Customer
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
        <Form onSubmit={handleSubmit} >
          <h1>Add a Customer</h1>
            <Input
             label="Customer Name"
             name="customerName"
             variant="outlined"
             value={values.customerName}
             onChange={handleInputChange}></Input>
             
        <Input
             label="Customer Address"
             name="customerAddress"
             variant="outlined"
             value={values.customerAddress}
             onChange={handleInputChange}></Input>
           
           <div className="ButtonGroup">
               <Button className="CreateCustomer"
                            variant="contained"
                            color="primary"
                            type="submit"
                        
                        >
                            Create
                        </Button>
                        <Button className="Cancel"
                            variant="contained"
                            onClick={resetForm}
                        >
                            Cancel
                        </Button>
           </div>
           
        </Form>
        </DialogContent>
        </Dialog>
    </div>
    )
}
const mapStateToProps=state=>({
    
    CustomerList:state.Customer.list
})

const mapActionsToProps={
    createCustomer: actions.create,
    updateCustomer: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(CustomerForm);
