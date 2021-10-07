// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//Declare a port
const port = 8888; //we can use 5000,3000,8888
//listen to the port
app.listen(port, (req, res) => {
    console.log("running server");
    console.log(`the server is running at localhost:${port}`);
});

//appPost function 
app.post('/addData', (req, res) => {
    projectData.Temperature = req.body.temp;
    projectData.Date = req.body.date;
    projectData.Feelings = req.body.feelings;
});
//get the data to the end point using the response.send 
app.get('/all', (req, res) => {
    res.send(projectData);
});
