import { Classification } from "../cohere/types";

export enum Sentiment {
    POSITIVE = 0,
    NEUTRAL,
    NEGATIVE,
};

export interface SentimentResult extends Classification {
    sentiment: Sentiment,
}
