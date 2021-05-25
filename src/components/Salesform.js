import { TextField } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from '../actions/Sales/Sales'



const initialFieldValues={

  productId:'',
  productName:'',
  id:'',
  customerId:'',
  customerName:'',
  storeId:'',
  storeName:''

}


const SalesForm =({classes,...props})=>{

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
        temp.productName=values.productName ? "" : "This field is required."
        temp.id=values.id ? "" : "This field is required."
        temp.storeName=values.storeName ? "" : "This field is required."
        temp.storeId=values.storeId ? "" : "This field is required."
        temp.productId=values.productId ? "" : "This field is required."
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
        props.createSales(values,()=>{window.alert('insert')})
        else
        props.updateSales(props.currentId,values,()=>{window.alert('updated')})
      }
  }
  useEffect(() => {
    if (props.currentId != 0) {
        setValues({
            ...props.SalesList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }
}, [props.currentId])


    return (<div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add a sales
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h1>Add a Sales record</h1>
            
       
        <TextField
             label="Customer Id"
             name="id"
             variant="outlined"
             value={values.id}
             onChange={handleInputChange}></TextField>
            
             
        <TextField
             label="Product Id"
             name="productId"
             variant="outlined"
             value={values.productId}
             onChange={handleInputChange}></TextField>
      
                   
        <TextField
             label="Store Id"
             name="storeId"
             variant="outlined"
             value={values.storeId}
             onChange={handleInputChange}></TextField>
                   
       
    
           <div className="ButtonGroup">
               <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
           </div>
        </form>
        </DialogContent>
        </Dialog>
    </div>
    )
}
const mapStateToProps=state=>({
    
    SalesList:state.Sales.list
})

const mapActionsToProps={
    createSales: actions.create,
    updateSales: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(SalesForm) ;