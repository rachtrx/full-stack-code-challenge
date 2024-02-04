require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

require('./routes/routes')(app); // Adjust the path as necessary

// Start the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});