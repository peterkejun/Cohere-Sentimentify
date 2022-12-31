import * as cohere from 'cohere-ai';
import { getEnv } from '../env';
import { Classifications } from './types';

const API_KEY = getEnv('API_KEY') as string;

cohere.init(API_KEY);


export const classify = async (inputs: string[]): Promise<Classifications> => {
    const response = await cohere.classify({
        model: 'finance-sentiment',
        inputs,
        preset: null,
    });
    return response.body.classifications;
}

