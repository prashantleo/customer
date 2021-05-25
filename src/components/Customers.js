import React,{useState,useEffect} from 'react';
import  {connect} from "react-redux"
import * as actions from "../actions/Customers"
import Customerform from "../components/Customerform"
import {TableContainer} from "@material-ui/core"
import { Grid,TableHead, Paper,TableRow, TableCell, TableBody , withStyles, ButtonGroup, Button} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})
const Customers=({classes,...props})=>{
    const [currentId, setCurrentId] = useState(0)
    useEffect(()=>{
        props.fetchAllCustomers()
    },[])

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteCustomer(id)
    }
    return(
         <Paper className={classes.paper} elevation={3}>
             <Grid item xs={6}>
    
        <Customerform {...({currentId,setCurrentId})}></Customerform>
        </Grid>
        <Grid  item xs={6}>
        <TableContainer>
        <TableHead>
                    <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Address</TableCell>

                    <TableCell>Actions</TableCell>
                    
                    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                                    props.CustomerList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.customerName}</TableCell>
                                            <TableCell>{record.customerAddress}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                          
                                            
                                        </TableRow>)
                                    })
                                }
                    </TableBody>
        </TableContainer>
    </Grid>
    </Paper>)
}
const mapStateToProps=state=>({
    
        CustomerList:state.Customer.list
    })

    const mapActionsToProps={
        fetchAllCustomers:actions.fetchALL,
        deleteCustomer: actions.Delete
    }

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Customers))