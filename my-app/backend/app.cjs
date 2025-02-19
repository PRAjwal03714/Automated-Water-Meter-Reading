const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001; // You can use any port you prefer

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection configuration
const connection = mysql.createConnection({
    host: 'sql3.freesqldatabase.com', // Replace with your MySQL host
    user: 'sql3710026', // Replace with your MySQL username
    password: 'BhVUzSqB6r', // Replace with your MySQL password
    database: 'sql3710026' // Replace with your MySQL database name
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Endpoint to fetch water meter readings
app.get('/water-meter-readings', (req, res) => {
    const query = 'SELECT * FROM Water_Meter_Readings'; // Replace with your table name
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from database:', err);
            res.status(500).json({ error: 'Error fetching data from database' });
        } else {
            res.json(results);
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
