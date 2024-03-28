const express = require('express');
const path = require('path');
const routes = require('./routes');


const app = express();
const PORT = process.env.PORT || 3306;

// Middleware to parse JSON request bodies
app.use(express.json());


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the 'public' directory

app.use(express.static('public'))
// app.use('/api', (req, res, next) => {
//   console.log('API Request:', req.method, req.url);
//   next();
// });

app.use(routes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
