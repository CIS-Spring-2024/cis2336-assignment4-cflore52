
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Middleware to parse JSON and form data
app.use(express.json()); // For parsing application/json
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serve Static files from the 'frontend' folder within 'public'
app.use(express.static(path.join(__dirname, 'frontend')));

// Specific routes for different asset types if needed
app.use('/Images', express.static(path.join(__dirname, 'frontend', 'Images')));
app.use('/CSS', express.static(path.join(__dirname,'frontend', 'CSS')));
app.use('/Javascript', express.static(path.join(__dirname, 'frontend', 'Javascript')));

// GET request to serve the main homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'Homepage.html'));
});

// GET request to serve specific HTML pages
app.get('/:htmlPage', (req, res) => {
  if (req.params.htmlPage === 'testorder.html') {
    // Specifically handle the testorder.html page
    res.sendFile(path.join(__dirname,'frontend', 'testorder.html'));
  } else {
    // General handler for all other HTML pages
    res.sendFile(path.join(__dirname, 'frontend', req.params.htmlPage));
  }
});
app.post('/submit-order', (req, res) => {
    console.log('Order received:', req.body); // Log the order to the server console
    res.redirect('/order-confirmation.html'); // Redirect to the confirmation page
});



// Server listening
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});