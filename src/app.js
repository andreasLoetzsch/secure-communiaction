const express = require('express');
const path = require('path');

PORT = process.env.PORT || 3000;

const app = express();

app.listen(PORT, (req, res) => {
    console.log(`Listening on port: ${PORT}`)
})

