import React,{useState,useEffect} from 'react';
import  {connect} from "react-redux"
import * as actions from "../actions/Products/Products"
import Productform from "../components/Productform"
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
const Products=({classes,...props})=>{
    const [currentId, setCurrentId] = useState(0)
    useEffect(()=>{
        props.fetchAllProducts()
    },[])

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteProducts(id)
    }
    return(
         <Paper className={classes.paper} elevation={3}>
             <Grid item xs={6}>
    
        <Productform {...({currentId,setCurrentId})}></Productform>
        </Grid>
        <Grid  item xs={6}>
        <TableContainer>
        <TableHead>
                    <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Price</TableCell>

                    <TableCell>Actions</TableCell>
                    
                    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                                    props.ProductList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.productName}</TableCell>
                                            <TableCell>{record.price}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.productId) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.productId)} /></Button>
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
    
        ProductList:state.Product.list
    })

    const mapActionsToProps={
        fetchAllProducts:actions.fetchALL,
        deleteProducts: actions.Delete
    }

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Products))