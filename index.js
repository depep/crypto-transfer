require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the frontend files
app.use(express.static(path.join(__dirname, 'public')));

// API route to fetch environment variables
app.get('/api/config', (req, res) => {
    res.json({
        rpcUrl: process.env.QUICKNODE_RPC_URL,
        receiverWallet: process.env.RECEIVER_WALLET
    });
});

// Serve the web interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
