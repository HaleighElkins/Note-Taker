const express = require ('express');
const fs = require ("fs");

// This should be setting up the express app
const app = express ();
const PORT = process.env.PORT || 3001;


// Middleware
//explain what urlencoded is
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//  route handles 
const apiRoutes = require ("./routes/api-routes");
const htmlRoutes = require ("./routes/html-routes");

//  next should be registering route handlers 
apiRoutes(app);
htmlRoutes (app);

