import { classify } from "../cohere/cohere";
import { Sentiment, SentimentResult } from "./types";

const sentiments: Map<Sentiment, string> = new Map([
    [Sentiment.POSITIVE, 'POSITIVE'],
    [Sentiment.NEGATIVE, 'NEGATIVE'],
    [Sentiment.NEUTRAL, 'NEUTRAL'],
]);

const stringToSentiment = (str: string): Sentiment => {
    for (let s of sentiments) {
        if (s[1] === str) {
            return s[0];
        }
    }
    return null;
}

const sentimentTostring = (sentiment: Sentiment): string => {
    return sentiments.get(sentiment) || null;
}

export const getSentiments = async (inputs: string[]): Promise<SentimentResult[]> => {
    const classifications = await classify(inputs);
    const results = classifications.map(cls => ({
        ...cls,
        sentiment: stringToSentiment(cls.prediction),
    }));
    return results;
}
