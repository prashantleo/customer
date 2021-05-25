import React,{useState,useEffect} from 'react';
import  {connect} from "react-redux"
import * as actions from "../actions/Sales/Sales"
import Salesform from "../components/Salesform"
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
const SALES=({classes,...props})=>{
    const [currentId, setCurrentId] = useState(0)
    useEffect(()=>{
        props.fetchAllSales()
    },[])

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteSales(id)
    }
    return(
         <Paper className={classes.paper} elevation={3}>
             <Grid item xs={6}>
    
        <Salesform {...({currentId,setCurrentId})}></Salesform>
        </Grid>
        <Grid  item xs={6}>
        <TableContainer>
        <TableHead>
                    <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Store Name</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Actions</TableCell>
                    
                    
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                                    props.SalesList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.productId}</TableCell>
                                            <TableCell>{record.id}</TableCell>
                                            <TableCell>{record.storeId}</TableCell>
                                            <TableCell>{record.date}</TableCell>


                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.salesId) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.salesId)} /></Button>
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
    
        SalesList:state.Sales.list
    })

    const mapActionsToProps={
        fetchAllSales:actions.fetchALL,
        deleteSales: actions.Delete
    }

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(SALES))