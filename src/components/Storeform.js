import { TextField } from '@material-ui/core'
import React,{useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useForm from "./useForm"
import { connect } from "react-redux";
import * as actions from '../actions/STORES/Stores'



const initialFieldValues={
    storeName:'',
    address:''

}


const StoreForm =({classes,...props})=>{

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
        temp.storeName=values.storeName?"" : "This field is required."
        temp.address=values.address? "" : "This field is required."
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
        props.createStore(values,()=>{window.alert('insert')})
        else
        props.updateStore(props.currentId,values,()=>{window.alert('updated')})
      }
  }
  useEffect(() => {
    if (props.currentId != 0) {
        setValues({
            ...props.StoreList.find(x => x.id == props.currentId)
        })
        setErrors({})
    }
}, [props.currentId])


    return (<div>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Create Store
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <h1>Add a Store</h1>
            
            <TextField
             label="Store Name"
             name="storeName"
             variant="outlined"
             value={values.storeName}
             onChange={handleInputChange}></TextField>
             
        <TextField
             label="Store Address"
             name="address"
             variant="outlined"
             value={values.address}
             onChange={handleInputChange}></TextField>
           
           <div>
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
    
    StoreList:state.Store.list
})

const mapActionsToProps={
    createStore: actions.create,
    updateStore: actions.update
}

export default connect(mapStateToProps, mapActionsToProps)(StoreForm) ;