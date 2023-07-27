import { generateMnemonic, mnemonicToSeedSync } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from '@solana/web3.js';

interface Wallet {
    privateKey: Uint8Array;
    mnemonic: string;
    publicAddress: string;
}

export function generateNewWallet(): Wallet {
    const wallet: Wallet = {} as Wallet;
    const mnemonic = generateMnemonic(256);
    const master_seed = mnemonicToSeedSync(mnemonic);
    const index = 0;
    const derived_path = `m/44'/501'/${index}'/0'`;
    const derived_seed = derivePath(derived_path, master_seed.toString('hex')).key;
    const keypair = Keypair.fromSeed(derived_seed);
    wallet.privateKey = keypair.secretKey;
    wallet.mnemonic = mnemonic;
    wallet.publicAddress = keypair.publicKey.toBase58();
    console.log("Wallet mnemonic: " + wallet.mnemonic);
    console.log(keypair.publicKey.toBase58());
    return wallet;
}
export function setConnection(network?: string) {
    let connection: Connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
    switch (network) {
        case 'mainnet':
            connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
            break;
        case 'testnet':
            connection = new Connection(clusterApiUrl('testnet'), 'confirmed');
            break;
        case 'devnet':
            connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        // Add more cases for other networks if needed
        default:
            throw new Error('Invalid network');
    }
    return connection;
}

export async function GetBalance(publicKeyStr: string, network?: string) {
    const connection = setConnection(network);
    const publicKey = new PublicKey(publicKeyStr);
    const balance = await connection.getBalance(publicKey);
    console.log('Balance:', balance);
    return balance;

}


export async function AirdropSol(publicKeyStr: string, amount: number, network?: string) {
    try {
        const connection = setConnection(network);
        const publicKey = new PublicKey(publicKeyStr);
        const signature = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
        console.log('Airdrop request submitted:', signature);
        return signature;
    } catch (error) {
        console.error('Error airdropping SOL:', error);
        return null;
    }
}

