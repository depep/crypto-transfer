require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const RECEIVER_WALLET = process.env.RECEIVER_WALLET;
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL;

// Middleware to log requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve the frontend
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the web interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API to provide environment details (for frontend use)
app.get('/api/config', (req, res) => {
    res.json({
        receiverWallet: RECEIVER_WALLET,
        rpcUrl: QUICKNODE_RPC_URL,
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Receiver Wallet: ${RECEIVER_WALLET}`);
    console.log(`QuickNode RPC URL: ${QUICKNODE_RPC_URL}`);
});
