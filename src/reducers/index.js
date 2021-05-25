import {combineReducers} from"redux";
import {Customer} from "./Customers"
import {Store} from "./Store"
import {Sales} from "./Sales"
import {Product} from "./Product"

export  const reducers = combineReducers({
    Customer,
    Store,
    Sales,
    Product
})