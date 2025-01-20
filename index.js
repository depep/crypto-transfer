require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
const RECEIVER_WALLET = process.env.RECEIVER_WALLET;

// Direct transfer link generation
app.get('/generate-link', (req, res) => {
    try {
        const solanaPayUrl = `solana:${RECEIVER_WALLET}?amount=ALL&spl-token=So11111111111111111111111111111111111111112`;
        res.redirect(solanaPayUrl);
    } catch (error) {
        console.error('Error generating link:', error);
        res.status(500).send('Error generating link');
    }
});

app.listen(PORT, () => {
    console.log(`Share this link: http://localhost:${PORT}/generate-link`);
    console.log(`Server running at http://localhost:${PORT}`);
});
