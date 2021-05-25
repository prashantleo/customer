import { TextField } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from '../actions/Products/Products'
import './Productform.css'



const initialFieldValues={

    productName:'',
    price:''

}


const ProductForm =({classes,...props})=>{

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
        temp.productName=values.productName?"" : "This field is required."
        temp.price=values.price ? "" : "This field is required."
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
        props.createProduct(values,()=>{window.alert('insert')})
        else
        props.updateProduct(props.currentId,values,()=>{window.alert('updated')})
      }
  }
  useEffect(() => {
    if (props.currentId != 0) {
        setValues({
            ...props.ProductList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }
}, [props.currentId])


    return (<div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add a product
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h1>Add a Product</h1>
            
            <TextField
             label="Product Name"
             name="productName"
             variant="outlined"
             value={values.productName}
             onChange={handleInputChange}></TextField>
             
        <TextField
             label="Price"
             name="price"
             variant="outlined"
             value={values.price}
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
    
    ProductList:state.Product.list
})

const mapActionsToProps={
    createProduct: actions.create,
    updateProduct: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(ProductForm) ;