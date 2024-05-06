const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to handle json and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint to handle form submissions
app.post('/submit-order', (req, res) => {
    const orderDetails = req.body;
    console.log(orderDetails);

    // Here you might handle data validation, processing, and possibly saving to a database
    // Simulate some processing
    if (orderDetails) {
        // Placeholder for your business logic, could calculate totals, check stock, etc.
        return res.status(200).json({
            status: 'success',
            message: 'Order processed successfully',
            data: orderDetails
        });
    } else {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid order data received'
        });
    }
});

// Catch-all for non-existent routes
app.use((req, res, next) => {
    res.status(404).send("Sorry, that route doesn't exist.");
});

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
