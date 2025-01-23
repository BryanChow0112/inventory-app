const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true })); 

// Set up view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample route (just to test if the server is running)
app.get('/', (req, res) => {
    res.send('Hello, Car Inventory App!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});