import web3 = require('@solana/web3.js')
import Dotenv from 'dotenv'
Dotenv.config()

async function main() {
    const newKeypair = web3.Keypair.generate()
    console.log(newKeypair.secretKey.toString())
}

main().then(() => {
    console.log('not done')
})    