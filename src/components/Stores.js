import React,{useState,useEffect} from 'react';
import  {connect} from "react-redux"
import * as actions from "../actions/STORES/Stores"
import {TableContainer} from "@material-ui/core"
import { Grid,TableHead, Paper,TableRow, TableCell, TableBody , withStyles, ButtonGroup, Button} from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import StoreForm from '../components/Storeform'


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
const STORES=({classes,...props})=>{
    const [currentId, setCurrentId] = useState(0)
    useEffect(()=>{
        props.fetchAllStores()
    },[])

    const onDelete = id=> {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteStores(id)
    }
    return(
         <Paper className={classes.paper} elevation={3}>
             <Grid item xs={6}>
    
        <StoreForm {...({currentId,setCurrentId})}></StoreForm>
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
                                    props.StoreList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.storeName}</TableCell>
                                            <TableCell>{record.address}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.storeId) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.storeId)} /></Button>
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
    
        StoreList:state.Store.list
    })

    const mapActionsToProps={
        fetchAllStores:actions.fetchALL,
        deleteStores: actions.Delete
    }

export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(STORES))