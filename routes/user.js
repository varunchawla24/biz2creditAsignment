const express = require('express');
const app = express();
const userController= require('../controllers/userController.js');
// create the instance of usercontroller
const UserController = new userController();
app.get('/getCustomers',UserController.getCustomerData);


module.exports=app;