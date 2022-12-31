import * as dotenv from 'dotenv';

dotenv.config();

const getEnv = (key: string): string | undefined => {
    return process.env[key];
}

export { getEnv };
