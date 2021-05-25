import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

import React from 'react';

import './App.css';
import {store} from "./actions/store"
import {Provider} from "react-redux"
import Customers from './components/Customers';
import STORES from './components/Stores';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SALES from '../src/components/Sales';


import Container from '@material-ui/core/Container'
import Products from './components/Products';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  
  },
}));
function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <AppBar className="appbar" style={{ background: '#000000' }} position="static">
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        <Tab label="Store" {...a11yProps(0)} />
        <Tab label="Customer" {...a11yProps(1)} />
        <Tab label="Sales" {...a11yProps(2)} />
        <Tab label="Product" {...a11yProps(3)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      
 <Provider store={store}>
    
   
   
    <STORES/>
   </Provider>
    </TabPanel>
    <TabPanel value={value} index={1}>
      
 <Provider store={store}>
    
   
   
    <Customers/>
   </Provider>
    </TabPanel>
    <TabPanel value={value} index={2}>
          
 <Provider store={store}>
    
   
   
    <SALES/>
   </Provider>
    </TabPanel>
    <TabPanel value={value} index={3}>
          
 <Provider store={store}>
    
   
   
    <Products/>
   </Provider>
    </TabPanel>
    
  </div>
);
}

 
    
   
   


export default App;
