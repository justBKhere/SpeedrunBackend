declare namespace NodeJS {
    interface ProvessEnv {
        PORT: number;
        PUBLIC_KEY: string;
        PRIVATE_KEY: string;
        MONGODB_URI: string;
        JWT_SECRET: string;
        SHYFT_API_KEY: string;
    }
}