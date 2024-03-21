
const express = require('express');
const fs = require("fs");
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5500;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Import and initialize API routes
const apiRoutes = require("./routes/route-api");
const htmlRoutes = require("./routes/route-html");

// Register route handlers
apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, function() {
    console.log("APP listening on PORT" + PORT);
});
