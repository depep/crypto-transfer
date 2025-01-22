require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const RECEIVER_WALLET = process.env.RECEIVER_WALLET;
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;

// Serve the frontend
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the web interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
