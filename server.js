const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Initiate
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    })
})