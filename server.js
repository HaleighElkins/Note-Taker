
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));

// I was getting a CSS file error stating something was not linking with MIME. This should help fix that error
app.use(express.static('public', { 
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route handlers
const apiRoutes = require('./routes/route-api');
const htmlRoutes = require('./routes/route-html');

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



app.use(express.static('public', { 
    setHeaders: (res, path, stat) => {
      if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      }
    }
  }));
  