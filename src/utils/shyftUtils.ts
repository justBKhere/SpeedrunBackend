import { ShyftSdk, Network } from '@shyft-to/js';

const shyft = new ShyftSdk({ apiKey: process.env.SHYFT_API_KEY || '', network: Network.Devnet });