import web3 from '@solana/web3.js';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
console.log(`Server started on port ${PORT}`);
// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
