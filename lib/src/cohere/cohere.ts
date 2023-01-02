import * as cohere from 'cohere-ai';
import { Classifications } from './types';

export const intialize = (API_KEY: string) => {
    cohere.init(API_KEY);   
}

export const classify = async (inputs: string[]): Promise<Classifications> => {
    const response = await cohere.classify({
        model: 'finance-sentiment',
        inputs,
        preset: null,
    });
    return response.body.classifications;
}

